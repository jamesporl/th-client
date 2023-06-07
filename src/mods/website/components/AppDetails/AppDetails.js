/* eslint-disable react/no-danger */
import React, { useCallback, useEffect, useMemo } from 'react';
import { HeartOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { Box, Text, Flex, useBreakpointValue, Heading } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import AppBannerCarousel from 'mods/website/components/AppBannerCarousel';
import AppHeader from 'mods/website/profile/components/AppHeader';
import Comments from 'mods/website/apps/containers/App/Comments';
import ToggleAppSupportMtn from 'mods/website/apps/gql/ToggleAppSupportMtn';
import useStores from 'core/stores/useStores';
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
  const { uiStore } = useStores();
  const rightColDisplay = useBreakpointValue({ base: 'none', lg: 'block' }, { fallback: 'lg' });
  const rightColDisplayRev = useBreakpointValue({ base: 'flex', lg: 'none' }, { fallback: 'lg' });

  // const [supportsCount, setSupportsCount] = useState(isPreview ? 10 : app.supportsCount);
  // const [isSupported, setIsSupported] = useState(isPreview ? true : app.isSupported);

  useEffect(() => {
    if (!isPreview) {
      uiStore.addApp(app);
    }
  }, [app]);

  const storedApp = useMemo(() => uiStore.apps.find((a) => a._id === app._id), [app, uiStore.apps]);

  const [toggleAppSupport] = useMutation(ToggleAppSupportMtn);

  const handleClickSupport = useCallback(() => {
    if (storedApp) {
      let newSupportsCount = storedApp.supportsCount - 1;
      if (!storedApp.isSupported) {
        newSupportsCount = storedApp.supportsCount + 1;
      }
      uiStore.updateApp(app._id, !storedApp.isSupported, newSupportsCount);
      const input = { appId: app._id };
      toggleAppSupport({ variables: { input } });
    }
  }, [app, storedApp]);

  let commentsSection = null;
  if (!isPreview) {
    commentsSection = (
      <Box mt={12}>
        <Comments app={app} />
      </Box>
    );
  }

  let fIsSupported = true;
  let fSupportsCount = 10;
  if (!isPreview && storedApp) {
    fIsSupported = storedApp.isSupported;
    fSupportsCount = storedApp.supportsCount;
  }

  const supportsComp = (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      mt={6}
      border="2px"
      borderColor="gray.200"
      borderRadius={4}
      p={6}
    >
      <Box>
        <Heading as="h4" fontWeight="700" fontSize="xl">
          Are you happy to support this app?
        </Heading>
      </Box>
      <Flex alignItems="center">
        <Box mr={6}>
          <AuthButton
            colorScheme="blue"
            variant={fIsSupported ? 'solid' : 'outline'}
            onClick={handleClickSupport}
            leftIcon={<HeartOutlined />}
            size="xs"
          >
            Support
          </AuthButton>
        </Box>
        <Box>
          <Text fontSize="2xl" fontWeight="bold">
            {fSupportsCount}
          </Text>
        </Box>
      </Flex>
    </Flex>
  );

  return (
    <Wrapper>
      <AppHeader app={app} />
      <Box width="100%" mt={6}>
        <Flex width="100%" justifyContent="space-between">
          <Box width="100%">
            <AppBannerCarousel bannerImgs={app.bannerImgs || []} videoUrl={app.videoUrl} />
            <Box mt={6}>
              <EditorContentDisplayWrapper>
                <div
                  dangerouslySetInnerHTML={{
                    __html: app.htmlDesc,
                  }}
                />
              </EditorContentDisplayWrapper>
            </Box>
            {supportsComp}
            <Flex justifyContent="center" style={{ display: rightColDisplayRev }} mt={6}>
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

export default observer(AppDetails);
