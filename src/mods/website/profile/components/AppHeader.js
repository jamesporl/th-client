import React from 'react';
import { Badge, Box, Flex, Text, Tag, HStack, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useStores from 'core/stores/useStores';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;

  .title:hover {
    text-decoration: none;
  }
`;

const AppHeader = ({ app, isClickable }) => {
  const { uiStore } = useStores();

  const router = useRouter();

  const handleOpenAppDetails = () => {
    window.history.replaceState(null, '', `/apps/${app.slug}`);
    uiStore.openGlobalModal(
      'appDetails',
      null,
      { slug: app.slug },
      {
        size: 'xl',
        autoFocus: false,
        onClose: () => {
          uiStore.closeGlobalModal();
          window.history.replaceState(null, '', router.asPath);
        },
      },
    );
  };

  let src = app.logoImg?.medium;
  if (!src) {
    src = '/img-sq-placeholder.png';
  }

  let tagsList = null;
  if (app.tags?.length) {
    tagsList = (
      <Box mt={2}>
        <HStack spacing={2}>
          {app.tags.map((t) => (
            <Tag key={t._id}>{t.name}</Tag>
          ))}
        </HStack>
      </Box>
    );
  }

  let img = <img src={src} alt="logo" width="88px" style={{ borderRadius: '0.5rem' }} />;
  let featuredBadge = null;
  if (app.isFeatured) {
    featuredBadge = (
      <Badge ml="2" fontSize="12px" colorScheme="yellow" variant="solid">
        Featured
      </Badge>
    );
  }

  let title = (
    <Heading as="h4" fontSize="xl" fontWeight="700">
      {app.name || 'Best App Ever'}
      {featuredBadge}
    </Heading>
  );
  if (isClickable) {
    img = (
      <button onClick={handleOpenAppDetails} type="button">
        {img}
      </button>
    );
    title = (
      <button onClick={handleOpenAppDetails} type="button" className="title">
        {title}
      </button>
    );
  }

  return (
    <Wrapper>
      <Box mr={4} cursor="pointer">
        {img}
      </Box>
      <div>
        <Flex alignItems="center">{title}</Flex>
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
  isClickable: PropTypes.bool,
};

AppHeader.defaultProps = {
  isClickable: false,
};

export default AppHeader;
