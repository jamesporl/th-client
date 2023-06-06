import React from 'react';
import { Badge, Box, Flex, Text, HStack, Heading, Link, Button } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;

  .title:hover {
    text-decoration: none;
  }
`;

const AppHeader = ({ app }) => {
  let src = app.logoImg;
  if (!src) {
    src = '/img-sq-placeholder.png';
  }

  let tagsList = null;
  if (app.tags?.length) {
    tagsList = (
      <Box mt={2}>
        <HStack spacing={2}>
          {app.tags.map((t) => (
            <Link
              key={t._id}
              href={`/categories/${t.slug}`}
              target="_blank"
              onClick={(ev) => ev.stopPropagation()}
            >
              <Button size="xs">{t.name}</Button>
            </Link>
          ))}
        </HStack>
      </Box>
    );
  }

  let featuredBadge = null;
  if (app.isFeatured) {
    featuredBadge = (
      <Badge ml="2" fontSize="12px" colorScheme="yellow" variant="solid">
        Featured
      </Badge>
    );
  }

  return (
    <Wrapper>
      <Box mr={4}>
        <img src={src} alt="logo" width="88px" style={{ borderRadius: '0.5rem' }} />
      </Box>
      <div>
        <Flex alignItems="center">
          <Heading as="h4" fontSize="xl" fontWeight="700">
            {app.name || 'Best App Ever'}
            {featuredBadge}
          </Heading>
        </Flex>
        <Text mt={1} color="gray.600">
          {app.shortDesc || '100% catchy slogan'}
        </Text>
        {tagsList}
      </div>
    </Wrapper>
  );
};

AppHeader.propTypes = {
  app: PropTypes.object.isRequired,
};

export default AppHeader;
