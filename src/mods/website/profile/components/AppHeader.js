import React from 'react';
import { Badge, Box, Flex, Text, HStack, Heading, Link, Button } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  overflow-x: hidden;

  .title:hover {
    text-decoration: none;
  }

  .logo-container {
    margin-right: 0.5rem;
    flex-shrink: 0;

    @media only screen and (min-width: 480px) {
      margin-right: 1rem;
    }

    img {
      width: 66px;
      border-radius: 0.375rem;

      @media only screen and (min-width: 480px) {
        width: 88px;
        border-radius: 0.5rem;
      }
    }
  }

  .name {
    font-weight: 700;
    font-size: 1rem;

    @media only screen and (min-width: 480px) {
      font-size: 1.25rem;
    }
  }

  .slogan {
    font-size: 0.75rem;

    @media only screen and (min-width: 480px) {
      font-size: 1rem;
    }
  }

  .chakra-badge {
    font-size: 8px;

    @media only screen and (min-width: 480px) {
      font-size: 12px;
    }
  }

  .app-tag-item {
    &:not(:last-child) {
      margin-right: 0.25rem;
    }
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
      <Box mt={1}>
        {app.tags.map((t) => (
          <Link
            key={t._id}
            href={`/categories/${t.slug}`}
            target="_blank"
            onClick={(ev) => ev.stopPropagation()}
            className="app-tag-item"
          >
            <Button size="xs">{t.name}</Button>
          </Link>
        ))}
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
      <div className="logo-container">
        <img src={src} alt={app.slug || 'logo'} />
      </div>
      <div>
        <Flex alignItems="center">
          <Heading as="h4" className="name">
            {app.name || 'Best App Ever'}
            {featuredBadge}
          </Heading>
        </Flex>
        <Text mt={1} color="gray.600" className="slogan">
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
