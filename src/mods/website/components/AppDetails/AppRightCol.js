import React from 'react';
import { Box, Avatar, Flex, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import FormattedDate from 'mods/base/components/FormattedDate';
import SocialUrlLinks from './SocialUrlLinks';
import AppUrlLinks from './AppUrlLinks';

const AppRightCol = ({ app }) => {
  let publishedAtDate = null;
  if (app) {
    if (app.publishedAt) {
      publishedAtDate = app.publishedAt;
    } else {
      publishedAtDate = new Date();
    }
  }
  return (
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
        <Flex mt={12}>
          <Box>
            <Avatar name={app.ownedBy.firstName} src={app.ownedBy?.image?.thumbnail} size="md" />
          </Box>
          <Box ml={4}>
            <Text fontSize="md" fontWeight="700">
              {`${app.ownedBy.firstName} ${app.ownedBy.lastName}`}
            </Text>
            <Text fontSize="xs" color="gray.500">
              Published on <FormattedDate date={publishedAtDate} format="shortDate" />
            </Text>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

AppRightCol.propTypes = {
  app: PropTypes.object.isRequired,
};

export default AppRightCol;
