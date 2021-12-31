import React from 'react';
import { Box, Flex, Link, Heading, Text, Tag, HStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';

const AppHeader = ({ logoImgSrc, shortDesc, name, tags, isSponsored, isClickable, slug }) => {
  let src = logoImgSrc;
  if (!logoImgSrc) {
    src = '/img-sq-placeholder.png';
  }

  let tagsList = null;
  if (tags?.length) {
    tagsList = (
      <Box mt={1}>
        <HStack spacing={2}>
          {tags.map((t) => (
            <Tag key={t._id}>{t.name}</Tag>
          ))}
        </HStack>
      </Box>
    );
  }

  let sponsorTag = false;
  if (isSponsored) {
    sponsorTag = (
      <Tag colorScheme="yellow" variant="solid" size="sm" ml={2}>
        Sponsored
      </Tag>
    );
  }

  let img = <img src={src} alt="logo" width="80px" style={{ borderRadius: '0.5rem' }} />;
  let title = (
    <Heading as="h3" size="md">
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
        <Link>{title}</Link>
      </NextLink>
    );
  }

  return (
    <Flex>
      <Box mr={4} cursor="pointer">
        {img}
      </Box>
      <div>
        <Flex alignItems="center">
          {title}
          {sponsorTag}
        </Flex>
        <Text color="gray.600" mt={1}>
          {shortDesc || '100% catchy slogan'}
        </Text>
        {tagsList}
      </div>
    </Flex>
  );
};

AppHeader.propTypes = {
  name: PropTypes.string,
  logoImgSrc: PropTypes.string,
  shortDesc: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.object),
  isClickable: PropTypes.bool,
  isSponsored: PropTypes.bool,
  slug: PropTypes.string,
};

AppHeader.defaultProps = {
  logoImgSrc: '',
  shortDesc: '',
  name: '',
  tags: [],
  isClickable: false,
  isSponsored: false,
  slug: '',
};

export default AppHeader;
