import React, { useCallback, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  Box,
  Flex,
  Text,
  Grid,
  GridItem,
  Heading,
  Input,
  useToast,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  ButtonGroup,
  useDisclosure,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useStores from 'core/stores/useStores';
import { DeleteOutlined } from '@ant-design/icons';
import DeleteAppDraftLogoImgMtn from 'mods/website/profile/gql/DeleteAppDraftLogoImgMtn';
import UpdateAppDraftLogoImgMtn from '../../../gql/UpdateAppDraftLogoImgMtn';
import dataUrltoFile from '../utils/dataUrlToFile';
import UploadImage from './UploadImage';
import BannerImgsUpload from './BannerImgsUpload';

const Wrapper = styled.div`
  .img-thumbnail-card {
    height: 49px;
    border: 4px solid #d8d8d8;
    background-color: #f3f3f3;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    &.active {
      border: 4px solid #63b3ed;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }

    img {
      height: 45px;
    }
  }

  .img-thumbnail-card:hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
`;

const Assets = ({
  app,
  appId,
  refetch,
  onChangeVideoUrl,
  onSubmitToServer,
  videoUrl: initialVideoUrl,
}) => {
  const { uiStore } = useStores();
  const toast = useToast();

  const [videoUrl, setVideoUrl] = useState(initialVideoUrl);
  const [videoUrlError, setVideoUrlError] = useState('');
  const [logoImgSrc, setLogoImgSrc] = useState('');

  const {
    onOpen: onOpenRemoveLogoPopover,
    onClose: onCloseRemoveLogoPopover,
    isOpen: isRemoveLogoPopoverOpen,
  } = useDisclosure();

  const [updateAppDraftLogoImg] = useMutation(UpdateAppDraftLogoImgMtn);
  const [deleteAppDraftLogoImg] = useMutation(DeleteAppDraftLogoImgMtn);

  useEffect(() => {
    if (app?.logoImg) {
      setLogoImgSrc(app.logoImg);
    }
  }, [appId]);

  const validateVideoUrl = (value) => {
    const pattern =
      /[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/;
    if (value) {
      if (value.length > 150) {
        setVideoUrlError('Too long');
        return false;
      }
      if (!pattern.test(value)) {
        setVideoUrlError('Invalid URL');
        return false;
      }
    }
    setVideoUrlError('');
    return true;
  };

  const handleChangeVideoUrl = (ev) => {
    const { value } = ev.target;
    validateVideoUrl(value);
    setVideoUrl(value);
    onChangeVideoUrl(value);
  };

  const handleValidateAndSubmitToServer = useCallback(() => {
    const isValid = validateVideoUrl(videoUrl);
    if (isValid) {
      onSubmitToServer();
    }
  }, [videoUrl]);

  const handleSubmitLogo = async (src, filename, type) => {
    setLogoImgSrc(src);
    const file = await dataUrltoFile(src, filename, type);
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      toast({
        position: 'top',
        status: 'error',
        variant: 'subtle',
        description: 'Image must be smaller than 2MB',
      });
      return;
    }
    const input = { appId, file };
    try {
      await updateAppDraftLogoImg({ variables: { input } });
      refetch();
    } catch (error) {
      toast({ position: 'top', status: 'error', variant: 'subtle', description: error.message });
    }
  };

  const handleChangeLogo = async (ev) => {
    const [file] = ev.target.files;
    const src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
    });
    uiStore.openGlobalModal('cropImage', 'Edit logo', {
      src,
      onSubmit: (newSrc) => handleSubmitLogo(newSrc, file.name, file.type),
      type: file.type,
      aspectRatio: 1,
    });
  };

  const handleRemoveLogo = async () => {
    try {
      const input = { appId };
      await deleteAppDraftLogoImg({ variables: { input } });
      setLogoImgSrc('');
    } catch (error) {
      toast({
        position: 'top',
        status: 'error',
        variant: 'subtle',
        description: 'Failed to remove the logo',
      });
    }
  };

  let deleteLogoBtn = null;
  if (logoImgSrc) {
    deleteLogoBtn = (
      <Flex justifyContent="center" alignItems="center" mb={8}>
        <Popover
          onOpen={onOpenRemoveLogoPopover}
          onClose={onCloseRemoveLogoPopover}
          isOpen={isRemoveLogoPopoverOpen}
        >
          <PopoverTrigger>
            <Button colorScheme="red" variant="outline" leftIcon={<DeleteOutlined />} size="xs">
              Remove Logo
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader fontWeight="semibold">Please confirm</PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>Are you sure you want to remove this logo?</PopoverBody>
            <PopoverFooter display="flex" justifyContent="flex-end">
              <ButtonGroup size="sm">
                <Button variant="outline" onClick={onCloseRemoveLogoPopover}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={handleRemoveLogo}>
                  Continue
                </Button>
              </ButtonGroup>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </Flex>
    );
  }

  return (
    <Wrapper>
      <Grid templateColumns="repeat(3, 1fr)" gap={8}>
        <GridItem colSpan={1}>
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Box borderBottomWidth="1px" padding={4}>
              <Heading as="h4" size="sm">
                Logo
              </Heading>
            </Box>
            <Flex justifyContent="center" alignItems="center" mt={8} mb={8}>
              <UploadImage
                uploadText="Upload (512px x 512px)"
                onChange={handleChangeLogo}
                imgSrc={logoImgSrc}
                imgId="logo"
                height="180px"
                width="180px"
              />
            </Flex>
            {deleteLogoBtn}
          </Box>
        </GridItem>
        <GridItem colSpan={2}>
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Box borderBottomWidth="1px" padding={4}>
              <Heading as="h4" size="sm">
                Explainer Video Embed URL
              </Heading>
            </Box>
            <Box padding={4}>
              <Input
                placeholder="e.g. https://www.youtube.com/embed/awesome"
                onChange={handleChangeVideoUrl}
                value={videoUrl}
                onBlur={handleValidateAndSubmitToServer}
                isInvalid={videoUrlError}
              />
              <Text color="tomato" fontSize="sm">
                {videoUrlError}
              </Text>
            </Box>
          </Box>
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mt={8}>
            <Box borderBottomWidth="1px" padding={4}>
              <Heading as="h4" size="sm">
                Banner Images
              </Heading>
              <Text mt={4} color="gray.500">
                Click on the + to upload an image. You can upload up to 10 images and drag-and-drop
                them to reorder them. An image should ideally be 1980px or less by 1080px.
              </Text>
            </Box>
            <Flex alignItems="center" m={8}>
              <BannerImgsUpload app={app} refetch={refetch} />
            </Flex>
          </Box>
        </GridItem>
      </Grid>
    </Wrapper>
  );
};

Assets.propTypes = {
  app: PropTypes.object.isRequired,
  appId: PropTypes.string,
  onChangeVideoUrl: PropTypes.func.isRequired,
  onSubmitToServer: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
  videoUrl: PropTypes.string,
};

Assets.defaultProps = {
  appId: '',
  videoUrl: '',
};

export default Assets;
