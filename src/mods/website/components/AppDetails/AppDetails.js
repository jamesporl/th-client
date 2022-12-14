/* eslint-disable react/no-danger */
import React, { useState, useCallback } from 'react';
import { SmileTwoTone } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { Box, Text, Flex, useBreakpointValue, Heading } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AppBannerCarousel from 'mods/website/components/AppBannerCarousel';
import AppHeader from 'mods/website/profile/components/AppHeader';
import Comments from 'mods/website/apps/containers/App/Comments';
import ToggleAppSupportMtn from 'mods/website/apps/gql/ToggleAppSupportMtn';
import AppRightCol from './AppRightCol';
import AuthButton from '../AuthButton';
import EditorContentDisplayWrapper from '../EditorContentDisplayWrapper';

const Wrapper = styled.div`
  .desc-container {
    margin-top: 1rem;
    border: 1px solid #f0f0f0;
    padding: 1rem;
  }
`;

const AppDetails = ({ app, isPreview }) => {
  const rightColDisplay = useBreakpointValue({ base: 'none', lg: 'block' }, { fallback: 'lg' });
  const rightColDisplayRev = useBreakpointValue({ base: 'flex', lg: 'none' }, { fallback: 'lg' });

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
      mt={8}
      border="2px"
      borderColor="gray.200"
      borderRadius={4}
      p={6}
    >
      <Box>
        <Heading as="h4" fontWeight="700" fontSize="xl">
          Are you happy to support this app? &nbsp;
          <SmileTwoTone />
        </Heading>
      </Box>
      <Flex alignItems="center">
        <Box mr={6}>
          <AuthButton
            colorScheme={isSupported ? 'blue' : 'gray'}
            variant={isSupported ? 'solid' : 'outline'}
            onClick={handleClickSupport}
            size="xs"
          >
            Support
          </AuthButton>
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
      <AppHeader app={app} />
      <Box width="100%" mt={12}>
        <Flex width="100%" justifyContent="space-between">
          <Box width="100%">
            <AppBannerCarousel bannerImgs={app.bannerImgs || []} videoUrl={app.videoUrl} />
            <Box mt={12}>
              <EditorContentDisplayWrapper>
                <div
                  dangerouslySetInnerHTML={{
                    __html: app.htmlDesc,
                  }}
                />
              </EditorContentDisplayWrapper>
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
