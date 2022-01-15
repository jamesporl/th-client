/* eslint-disable react/no-danger */
import React, { useState, useCallback } from 'react';
import { SmileOutlined, SmileTwoTone } from '@ant-design/icons';
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
  display: flex;
  justify-content: space-between;

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
      <Box mt={8}>
        <Comments app={app} />
      </Box>
    );
  }

  let supportIcon = <SmileTwoTone style={{ fontSize: 24 }} />;
  if (!isSupported) {
    supportIcon = <SmileOutlined style={{ fontSize: 24, color: '#2b6cb0' }} />;
  }

  const supportsComp = (
    <Flex justifyContent="center" mt={8}>
      <Text mr={8} color="gray.600" fontSize="sm">
        Are you happy to support this app?
      </Text>
      <Button
        className="support-btn"
        colorScheme="blue"
        variant="link"
        size="md"
        onClick={handleClickSupport}
        style={{ textDecoration: 'none' }}
      >
        {supportIcon}
        <Text fontWeight="bold" ml={2}>
          {`${supportsCount} ${supportsCount === 1 ? 'support' : 'supports'}`}
        </Text>
      </Button>
    </Flex>
  );

  return (
    <Wrapper>
      <Box width="100%">
        <AppHeader
          name={app.name}
          shortDesc={app.shortDesc}
          logoImgSrc={app.logoImg?.medium}
          tags={app.tags}
        />
        <div className="desc-container">
          <AppBannerCarousel bannerImgs={app.bannerImgs || []} videoUrl={app.videoUrl} />
          {supportsComp}
          <div
            className="desc"
            dangerouslySetInnerHTML={{
              __html: app.desc,
            }}
          />
        </div>
        <Flex justifyContent="center" style={{ display: rightColDisplayRev }} mt={8}>
          <AppRightCol app={app} />
        </Flex>
        {commentsSection}
      </Box>
      <Box flexGrow="1" ml="2rem" style={{ display: rightColDisplay }} width="300px">
        <AppRightCol app={app} />
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
