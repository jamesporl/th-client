import React from 'react';
import { Box, Flex, Link, Text, Tag, HStack, Heading } from '@chakra-ui/react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;

  .title:hover {
    text-decoration: none;
  }
`;

const AppHeader = ({ logoImgSrc, shortDesc, name, tags, isClickable, slug }) => {
  let src = logoImgSrc;
  if (!logoImgSrc) {
    src = '/img-sq-placeholder.png';
  }

  let tagsList = null;
  if (tags?.length) {
    tagsList = (
      <Box mt={2}>
        <HStack spacing={2}>
          {tags.map((t) => (
            <Tag key={t._id}>{t.name}</Tag>
          ))}
        </HStack>
      </Box>
    );
  }

  let img = <img src={src} alt="logo" width="88px" style={{ borderRadius: '0.5rem' }} />;
  let title = (
    <Heading as="h4" fontSize="xl" fontWeight="700">
      {name || 'Best App Ever'}
    </Heading>
  );
  if (isClickable) {
    img = (
      <NextLink href={`/apps/${slug}`} passHref>
        <Link>{img}</Link>
      </NextLink>
    );
    title = (
      <NextLink href={`/apps/${slug}`} passHref>
        <Link className="title">{title}</Link>
      </NextLink>
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
          {shortDesc || '100% catchy slogan'}
        </Text>
        {tagsList}
      </div>
    </Wrapper>
  );
};

AppHeader.propTypes = {
  name: PropTypes.string,
  logoImgSrc: PropTypes.string,
  shortDesc: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.object),
  isClickable: PropTypes.bool,
  slug: PropTypes.string,
};

AppHeader.defaultProps = {
  logoImgSrc: '',
  shortDesc: '',
  name: '',
  tags: [],
  isClickable: false,
  slug: '',
};

export default AppHeader;
