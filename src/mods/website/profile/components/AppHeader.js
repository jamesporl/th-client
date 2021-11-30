import React from 'react';
import { Box, Flex, Heading, Text, Tag, HStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const AppHeader = ({ logoImgSrc, shortDesc, name, tags, isSponsored }) => {
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

  return (
    <Flex>
      <Box mr={4}>
        <img src={src} alt="logo" width="80px" style={{ borderRadius: '0.5rem' }} />
      </Box>
      <div>
        <Flex alignItems="center">
          <Heading as="h3" size="md">
            {name || 'Best App Ever'}
          </Heading>
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
  isSponsored: PropTypes.bool,
};

AppHeader.defaultProps = {
  logoImgSrc: '',
  shortDesc: '',
  name: '',
  tags: [],
  isSponsored: false,
};

export default AppHeader;
