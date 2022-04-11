import React, { useCallback, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Box, Flex, Text, Grid, GridItem, Heading, Input, useToast } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useStores from 'core/stores/useStores';
import UpdateAppDraftBannerImgMtn from '../../../gql/UpdateAppDraftBannerImgMtn';
import UpdateAppDraftLogoImgMtn from '../../../gql/UpdateAppDraftLogoImgMtn';
import UploadImage from './UploadImage';

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

export async function dataUrltoFile(dataUrl, filename, type) {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  return new File([blob], filename, { type });
}

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
  const [selectedBannerImgIdx, setSelectedBannerImgIdx] = useState(0);
  const [bannerImgSrcs, setBannerImgSrcs] = useState(['', '', '', '', '']);

  const [updateAppDraftBannerImg] = useMutation(UpdateAppDraftBannerImgMtn);
  const [updateAppDraftLogoImg] = useMutation(UpdateAppDraftLogoImgMtn);

  let selectedBannerImgSrc = null;
  if (bannerImgSrcs?.length && selectedBannerImgIdx < bannerImgSrcs.length) {
    selectedBannerImgSrc = bannerImgSrcs[selectedBannerImgIdx];
  }

  useEffect(() => {
    if (app?.logoImg) {
      setLogoImgSrc(app.logoImg.medium);
    }
    if (app?.bannerImgs?.length) {
      setBannerImgSrcs(
        [0, 1, 2, 3, 4].map((idx) => {
          const img = app.bannerImgs.find((i) => i.order === idx);
          if (img) {
            return img.image.large;
          }
          return '';
        }),
      );
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

  const handleSubmitBanner = async (src, filename, type, bannerImgIdx) => {
    setBannerImgSrcs((prevImgSrcs) =>
      prevImgSrcs.map((imgSrc, idx) => {
        if (idx === bannerImgIdx) {
          return src;
        }
        return imgSrc;
      }),
    );
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
    const input = { appId, order: selectedBannerImgIdx, file };
    try {
      await updateAppDraftBannerImg({ variables: { input } });
      refetch();
    } catch (error) {
      toast({ position: 'top', status: 'error', variant: 'subtle', description: error.message });
    }
  };

  const handleChangeBanner = useCallback(
    async (ev) => {
      const [file] = ev.target.files;
      const src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
      });
      uiStore.openGlobalModal('cropImage', 'Edit image', {
        src,
        onSubmit: (newSrc) =>
          handleSubmitBanner(newSrc, file.name, file.type, selectedBannerImgIdx),
        type: file.type,
      });
    },
    [selectedBannerImgIdx],
  );

  const handleClickBannerImgThumbnailCard = (idx) => {
    setSelectedBannerImgIdx(idx);
  };

  const bannerImgThumbnails = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((idx) => {
    const imgSrc = bannerImgSrcs[idx];
    let imgContent = (
      <img src="/img-rect-thumbnail-placeholder.png" alt="app-banner" width="80px" />
    );
    if (imgSrc) {
      imgContent = <img src={imgSrc} alt="app-banner" />;
    }
    const className =
      idx === selectedBannerImgIdx ? 'img-thumbnail-card active' : 'img-thumbnail-card';

    return (
      <GridItem key={idx}>
        <div
          className={className}
          onClick={() => handleClickBannerImgThumbnailCard(idx)}
          onKeyDown={() => handleClickBannerImgThumbnailCard(idx)}
          tabIndex={0}
          role="button"
        >
          {imgContent}
        </div>
      </GridItem>
    );
  });

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
            </Box>
            <Box padding={4}>
              <Flex justifyContent="center">
                <Box>
                  <Grid templateColumns="repeat(5, 1fr)" gap={2}>
                    {bannerImgThumbnails}
                  </Grid>
                </Box>
              </Flex>
              <Flex justifyContent="center" alignItems="center" mt={8} mb={8}>
                <UploadImage
                  uploadText="Upload (1980px or less x 1080px)"
                  onChange={handleChangeBanner}
                  imgSrc={selectedBannerImgSrc}
                  imgId={`banner_${selectedBannerImgIdx}`}
                  height="270px"
                  width="480px"
                />
              </Flex>
            </Box>
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
