import React from 'react';
import { Box, Avatar, Flex, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import SocialUrlLinks from './SocialUrlLinks';
import AppUrlLinks from './AppUrlLinks';

const AppRightCol = ({ app }) => (
  <Flex justifyContent="center" width="100%">
    <Box width="100%">
      <AppUrlLinks
        websiteUrl={app.websiteUrl}
        playStoreUrl={app.playStoreUrl}
        appStoreUrl={app.appStoreUrl}
      />
      <Box mt={12}>
        <SocialUrlLinks socialUrls={app.socialUrls} />
      </Box>
      <Box mt={12}>
        <Text fontSize="xs" color="gray.600" fontWeight="500">
          Created By
        </Text>
        <Flex mt={4} alignItems="center">
          <Avatar name={app.ownedBy.firstName} src={app.ownedBy?.image?.thumbnail} size="sm" />
          <Text ml={4}>{`${app.ownedBy.firstName} ${app.ownedBy.lastName}`}</Text>
        </Flex>
      </Box>
    </Box>
  </Flex>
);

AppRightCol.propTypes = {
  app: PropTypes.object.isRequired,
};

export default AppRightCol;
