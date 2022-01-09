import React from 'react';
import { GlobalOutlined } from '@ant-design/icons';
import { Link, Button, VStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;

  .website-btn:hover {
    text-decoration: none;
  }
`;

const AppUrlLinks = ({ websiteUrl, appStoreUrl, playStoreUrl }) => {
  if (!websiteUrl && !appStoreUrl && !playStoreUrl) {
    return null;
  }

  let websiteBtn = null;
  if (websiteUrl) {
    websiteBtn = (
      <Link href={websiteUrl} isExternal style={{ width: '100%' }} className="website-btn">
        <Button colorScheme="blue" isFullWidth leftIcon={<GlobalOutlined />}>
          Visit Website
        </Button>
      </Link>
    );
  }
  let appStoreBtn = null;
  if (appStoreUrl) {
    appStoreBtn = (
      <Link href={appStoreUrl} isExternal>
        <img src="/app-store-badge.svg" alt="app-store" width="160px" />
      </Link>
    );
  }
  let playStoreBtn = null;
  if (playStoreUrl) {
    playStoreBtn = (
      <Link href={playStoreUrl} isExternal>
        <img src="/google-play-badge.png" alt="google-play" width="160px" />
      </Link>
    );
  }
  return (
    <Wrapper>
      <VStack spacing={2} mt={8} alignContent="center">
        {websiteBtn}
        {appStoreBtn}
        {playStoreBtn}
      </VStack>
    </Wrapper>
  );
};

AppUrlLinks.propTypes = {
  appStoreUrl: PropTypes.string,
  playStoreUrl: PropTypes.string,
  websiteUrl: PropTypes.string,
};

AppUrlLinks.defaultProps = {
  appStoreUrl: '',
  playStoreUrl: '',
  websiteUrl: '',
};

export default AppUrlLinks;
