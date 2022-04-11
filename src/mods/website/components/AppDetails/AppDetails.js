/* eslint-disable react/no-danger */
import React, { useState, useCallback } from 'react';
import { SmileTwoTone } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { Box, Text, Button, Flex, useBreakpointValue } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AppBannerCarousel from 'mods/website/components/AppBannerCarousel';
import AppHeader from 'mods/website/profile/components/AppHeader';
import Comments from 'mods/website/apps/containers/App/Comments';
import ToggleAppSupportMtn from 'mods/website/apps/gql/ToggleAppSupportMtn';
import AppRightCol from './AppRightCol';

const Wrapper = styled.div`
  .desc-container {
    margin-top: 1rem;
    border: 1px solid #f0f0f0;
    padding: 1rem;

    .desc {
      margin-top: 2rem;
    }
  }
`;

const AppDetails = ({ app, isPreview }) => {
  const rightColDisplay = useBreakpointValue({ base: 'none', lg: 'block' });
  const rightColDisplayRev = useBreakpointValue({ base: 'flex', lg: 'none' });

  const [supportsCount, setSupportsCount] = useState(isPreview ? 10 : app.supportsCount);
  const [isSupported, setIsSupported] = useState(isPreview ? true : app.isSupported);

  const [toggleAppSupport] = useMutation(ToggleAppSupportMtn);

  const handleClickSupport = useCallback(() => {
    if (!isPreview) {
      setIsSupported(!isSupported);
      if (isSupported) {
        setSupportsCount((c) => c - 1);
      } else {
        setSupportsCount((c) => c + 1);
      }
      const input = { appId: app._id };
      toggleAppSupport({ variables: { input } });
    }
  }, [isSupported, isPreview]);

  let commentsSection = null;
  if (!isPreview) {
    commentsSection = (
      <Box mt={16}>
        <Comments app={app} />
      </Box>
    );
  }

  const supportsComp = (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      mt={16}
      mb={16}
      border="2px"
      borderColor="gray.200"
      borderRadius={4}
      p={6}
    >
      <Box>
        <Text fontWeight="500" fontSize="lg">
          Are you happy to support this app? &nbsp;
          <SmileTwoTone />
        </Text>
      </Box>
      <Flex alignItems="center">
        <Box mr={6}>
          <Button
            colorScheme={isSupported ? 'blue' : 'gray'}
            variant={isSupported ? 'solid' : 'outline'}
            onClick={handleClickSupport}
            size="xs"
          >
            Support
          </Button>
        </Box>

        <Box>
          <Text fontSize="2xl" fontWeight="bold">
            {supportsCount}
          </Text>
        </Box>
      </Flex>
    </Flex>
  );

  return (
    <Wrapper>
      <AppHeader
        name={app.name}
        shortDesc={app.shortDesc}
        logoImgSrc={app.logoImg?.medium}
        tags={app.tags}
      />
      <Box width="100%" mt={12}>
        <Flex width="100%" justifyContent="space-between">
          <Box width="100%">
            <AppBannerCarousel bannerImgs={app.bannerImgs || []} videoUrl={app.videoUrl} />
            <Box mt={12}>
              <div
                className="desc"
                dangerouslySetInnerHTML={{
                  __html: app.desc,
                }}
              />
            </Box>
            {supportsComp}
            <Flex justifyContent="center" style={{ display: rightColDisplayRev }} mt={8}>
              <AppRightCol app={app} />
            </Flex>
            {commentsSection}
          </Box>
          <Box flexGrow="1" ml="4rem" style={{ display: rightColDisplay }} width="350px">
            <AppRightCol app={app} />
          </Box>
        </Flex>
      </Box>
    </Wrapper>
  );
};

AppDetails.propTypes = {
  app: PropTypes.object.isRequired,
  isPreview: PropTypes.bool,
};

AppDetails.defaultProps = {
  isPreview: false,
};

export default AppDetails;
