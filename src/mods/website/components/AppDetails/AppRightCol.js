import React from 'react';
import { Box, Avatar, Flex, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SocialUrlLinks from './SocialUrlLinks';
import AppUrlLinks from './AppUrlLinks';

const Wrapper = styled.div`
  .right-col-item:not(:first-child) {
    margin-top: 2rem;
  }
`;

const AppRightCol = ({ app }) => {
  const { socialUrls, websiteUrl, playStoreUrl, appStoreUrl } = app;

  let appUrlLinks = null;
  if (websiteUrl || playStoreUrl || appStoreUrl) {
    appUrlLinks = (
      <Box className="right-col-item">
        <AppUrlLinks
          websiteUrl={app.websiteUrl}
          playStoreUrl={app.playStoreUrl}
          appStoreUrl={app.appStoreUrl}
        />
      </Box>
    );
  }

  let socialUrlLnks = null;
  const { facebook, instagram, twitter, linkedIn, github } = socialUrls || {};
  if (facebook || instagram || twitter || linkedIn || github) {
    socialUrlLnks = (
      <Box className="right-col-item">
        <SocialUrlLinks socialUrls={socialUrls} />
      </Box>
    );
  }
  return (
    <Wrapper>
      <Flex justifyContent="center" width="100%">
        <Box width="100%">
          {appUrlLinks}
          {socialUrlLnks}
          <Flex className="right-col-item">
            <Box>
              <Avatar name={app.ownedBy.firstName} src={app.ownedBy?.image?.thumbnail} size="md" />
            </Box>
            <Flex ml={4} alignItems="center">
              <Text fontSize="md" fontWeight="700">
                {`${app.ownedBy.firstName} ${app.ownedBy.lastName}`}
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Wrapper>
  );
};

AppRightCol.propTypes = {
  app: PropTypes.object.isRequired,
};

export default AppRightCol;
