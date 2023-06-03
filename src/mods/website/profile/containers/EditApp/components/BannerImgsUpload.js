import React, { useCallback, useState } from 'react';
import { orderBy } from 'lodash';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import useStores from 'core/stores/useStores';
import {
  Button,
  ButtonGroup,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  useToast,
} from '@chakra-ui/react';
import { DeleteOutlined } from '@ant-design/icons';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import UploadImage from './UploadImage';
import AddAppDraftBannerImgMtn from '../../../gql/AddAppDraftBannerImgMtn';
import dataUrltoFile from '../utils/dataUrlToFile';

const Wrapper = styled.div`
  width: 100%;

  .banner-image-item {
    display: flex;
    justify-content: space-between;
    height: 120px;
    margin-top: 1rem;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;

    .image {
      img {
        max-height: 100%;
      }
    }

    .actions {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const BannerImgsUpload = ({ app, refetch }) => {
  const { uiStore } = useStores();

  const toast = useToast();

  const [bannerImgs, setBannerImgs] = useState(app.bannerImgs || []);
  const [imgIdWithOpenDeletePopover, setImgIdWithOpenDeletePopover] = useState('');

  const [addAppDraftBannerImg] = useMutation(AddAppDraftBannerImgMtn);

  const handleOpenDeletePopover = (imgId) => setImgIdWithOpenDeletePopover(imgId);

  const handleCloseDeletePopover = () => setImgIdWithOpenDeletePopover('');

  const handleSubmitBannerImg = async (src, filename, type) => {
    const file = await dataUrltoFile(src, filename, type);
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      toast({
        position: 'top',
        status: 'error',
        variant: 'subtle',
        description: 'Image must be smaller than 5MB',
      });
      return;
    }
    const input = { appId: app.appId, file };
    try {
      const result = await addAppDraftBannerImg({ variables: { input } });
      setBannerImgs((imgs) => [
        ...imgs,
        {
          _id: result.data.addAppDraftBannerImg._id,
          image: {
            large: src,
            thumbnail: src,
          },
          order: imgs.length,
        },
      ]);
      refetch();
    } catch (error) {
      toast({ position: 'top', status: 'error', variant: 'subtle', description: error.message });
    }
  };

  const handleClickAddBannerImg = async (ev) => {
    const [file] = ev.target.files;
    const src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
    });
    uiStore.openGlobalModal('cropImage', 'Edit image', {
      src,
      onSubmit: (newSrc) => handleSubmitBannerImg(newSrc, file.name, file.type),
      type: file.type,
    });
  };

  const handleDragEnd = useCallback(
    (result) => {
      if (!result.destination) {
        return;
      }

      const { source, destination } = result;

      if (destination.index === source.index) {
        return;
      }

      const orderedBannerImgs = orderBy(bannerImgs, [(img) => img.order], ['asc']);

      const newBannerImgs = orderedBannerImgs.map((img, index) => {
        let order = index;
        if (index === source.index) {
          order = destination.index;
        } else if (destination.index < source.index) {
          if (index >= destination.index) {
            order = index + 1;
          }
        } else if (index >= source.index) {
          order = index - 1;
        }
        return { ...img, order };
      });
      setBannerImgs(newBannerImgs);
    },
    [bannerImgs],
  );

  let bannerImgsList = null;

  if (bannerImgs.length) {
    const orderedBannerImgs = orderBy(bannerImgs, [(img) => img.order], ['asc']);
    bannerImgsList = (
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="app-draft-banner-imgs-droppable">
          {(drop) => (
            <div className="banner-image-items" ref={drop.innerRef} {...drop.droppableProps}>
              {orderedBannerImgs.map((bImg, index) => {
                const isPopoverOpen = imgIdWithOpenDeletePopover === bImg._id;
                return (
                  <Draggable draggableId={bImg._id} index={index} key={bImg._id}>
                    {(provided) => (
                      <div
                        key={bImg.image.thumbnail}
                        className="banner-image-item"
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                      >
                        <div className="image">
                          <img src={bImg.image.thumbnail} alt="banner-img" />
                        </div>
                        <div className="actions">
                          <Popover
                            onOpen={() => handleOpenDeletePopover(bImg._id)}
                            onClose={handleCloseDeletePopover}
                            isOpen={isPopoverOpen}
                          >
                            <PopoverTrigger>
                              <IconButton
                                colorScheme="red"
                                variant="outline"
                                icon={<DeleteOutlined />}
                                size="xs"
                              />
                            </PopoverTrigger>
                            <PopoverContent>
                              <PopoverHeader fontWeight="semibold">Please confirm</PopoverHeader>
                              <PopoverArrow />
                              <PopoverCloseButton />
                              <PopoverBody>Are you sure you want to remove this logo?</PopoverBody>
                              <PopoverFooter display="flex" justifyContent="flex-end">
                                <ButtonGroup size="sm">
                                  <Button variant="outline" onClick={handleCloseDeletePopover}>
                                    Cancel
                                  </Button>
                                  <Button colorScheme="red" onClick={() => undefined}>
                                    Continue
                                  </Button>
                                </ButtonGroup>
                              </PopoverFooter>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    )}
                  </Draggable>
                );
              })}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }

  return (
    <Wrapper>
      <UploadImage
        onChange={handleClickAddBannerImg}
        height="100px"
        width="100%"
        uploadText="Upload (1980px or less by 1080px)"
      />
      {bannerImgsList}
    </Wrapper>
  );
};

BannerImgsUpload.propTypes = {
  app: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
};

BannerImgsUpload.defaultProps = {};

export default BannerImgsUpload;
