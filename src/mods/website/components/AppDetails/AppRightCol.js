import React from 'react';
import { Box, Avatar, Flex, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import SocialUrlLinks from './SocialUrlLinks';
import AppUrlLinks from './AppUrlLinks';

const AppRightCol = ({ app }) => (
  <Flex justifyContent="center" width="100%">
    <Box width="100%">
      <SocialUrlLinks socialUrls={app.socialUrls} />
      <AppUrlLinks
        websiteUrl={app.websiteUrl}
        playStoreUrl={app.playStoreUrl}
        appStoreUrl={app.appStoreUrl}
      />
      <Flex
        mt={8}
        alignItems="center"
        backgroundColor="gray.100"
        padding={4}
        borderRadius={4}
        flexDirection="column"
        width="100%"
      >
        <Text fontSize="sm" textTransform="uppercase" letterSpacing="2px" fontWeight="bold">
          Creator
        </Text>
        <Flex mt={4} alignItems="center">
          <Avatar name={app.ownedBy.firstName} src={app.ownedBy?.image?.thumbnail} size="sm" />
          <Text ml={4}>{`${app.ownedBy.firstName} ${app.ownedBy.lastName}`}</Text>
        </Flex>
      </Flex>
    </Box>
  </Flex>
);

AppRightCol.propTypes = {
  app: PropTypes.object.isRequired,
};

export default AppRightCol;
