import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Box, Flex, Text } from '@chakra-ui/react';
import styled from 'styled-components';
import AppHeader from 'mods/website/profile/components/AppHeader';
import SupportsAndCommentsBlock from './SupportsAndCommentsBlock';

const Wrapper = styled.div`
  border: 1px solid #efefef;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  padding: 1rem;
  border-radius: 0.5rem;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  .comments {
    margin-top: 1rem;
  }
`;

const App = ({ app }) => (
  <Wrapper>
    <Flex justifyContent="space-between">
      <AppHeader
        logoImgSrc={app.logoImg?.medium}
        name={app.name}
        shortDesc={app.shortDesc}
        tags={app.tags}
        isSponsored={app.isSponsored}
        isClickable
        slug={app.slug}
      />
      <Box>
        <Text color="gray.300" fontSize="sm">
          {moment(app.publishedAt).fromNow()}
        </Text>
      </Box>
    </Flex>
    <SupportsAndCommentsBlock app={app} />
  </Wrapper>
);

App.propTypes = {
  app: PropTypes.object.isRequired,
};

export default App;
