import React from 'react';
import { HStack, Link, IconButton, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import {
  FacebookFilled,
  GithubFilled,
  InstagramFilled,
  LinkedinFilled,
  TwitterCircleFilled,
} from '@ant-design/icons';

const SocialUrlLinks = ({ socialUrls }) => {
  const { facebook, instagram, twitter, linkedIn, github } = socialUrls || {};
  if (!socialUrls && !(facebook || instagram || twitter || linkedIn || github)) {
    return null;
  }

  let facebookBtn = null;
  if (facebook) {
    facebookBtn = (
      <Link href={facebook} isExternal>
        <IconButton
          variant="outline"
          colorScheme="blackAlpha"
          aria-label="facebook"
          fontSize="20px"
          icon={<FacebookFilled />}
        />
      </Link>
    );
  }
  let instragramBtn = null;
  if (instagram) {
    instragramBtn = (
      <Link href={instagram} isExternal as="button">
        <IconButton
          variant="outline"
          colorScheme="blackAlpha"
          aria-label="instagram"
          fontSize="20px"
          icon={<InstagramFilled />}
        />
      </Link>
    );
  }
  let twitterBtn = null;
  if (twitter) {
    twitterBtn = (
      <Link href={twitter} isExternal>
        <IconButton
          variant="outline"
          colorScheme="blackAlpha"
          aria-label="twitter"
          fontSize="20px"
          icon={<TwitterCircleFilled />}
        />
      </Link>
    );
  }
  let linkedInBtn = null;
  if (linkedIn) {
    linkedInBtn = (
      <Link href={linkedIn} isExternal>
        <IconButton
          variant="outline"
          colorScheme="blackAlpha"
          aria-label="linkedIn"
          fontSize="20px"
          icon={<LinkedinFilled />}
        />
      </Link>
    );
  }
  let githubBtn = null;
  if (github) {
    githubBtn = (
      <Link href={github} isExternal>
        <IconButton
          variant="outline"
          colorScheme="blackAlpha"
          aria-label="github"
          fontSize="20px"
          icon={<GithubFilled />}
        />
      </Link>
    );
  }
  return (
    <>
      <Text size="xs" textTransform="uppercase" color="gray.600" fontWeight="500">
        Follow this app
      </Text>
      <HStack spacing={4} mt={4}>
        {facebookBtn}
        {instragramBtn}
        {twitterBtn}
        {linkedInBtn}
        {githubBtn}
      </HStack>
    </>
  );
};

SocialUrlLinks.propTypes = {
  socialUrls: PropTypes.object,
};

SocialUrlLinks.defaultProps = {
  socialUrls: null,
};

export default SocialUrlLinks;
