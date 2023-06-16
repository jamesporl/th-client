import React from 'react';
import NextLink from 'next/link';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { Box, Flex, Button, Text } from '@chakra-ui/react';
import useStores from 'core/stores/useStores';
import useClickSubmitAnApp from 'mods/website/hooks/useClickSubmitAnApp';
import Image from 'next/image';

const Wrapper = styled.div`
  @media only screen and (min-width: 992px) {
    margin-left: 4rem;
    width: 350px;
  }
`;

const HomeRightSide = () => {
  const { authStore } = useStores();

  const handleClickSubmitAnApp = useClickSubmitAnApp();

  let loginBtn = null;
  if (!authStore.myProfile) {
    loginBtn = (
      <Box textAlign="center">
        <NextLink href="/account/login" legacyBehavior>
          <Button
            colorScheme="blue"
            size="md"
            width="100%"
            maxWidth="350px"
            mt={8}
            alignSelf="center"
          >
            Log in or Sign up
          </Button>
        </NextLink>
      </Box>
    );
  }

  return (
    <Wrapper>
      <Box padding={4} borderRadius={8} backgroundColor="gray.100">
        <Text fontWeight="700" color="blue.600" fontSize="2xl" letterSpacing="1px">
          This Platform
        </Text>
        <Flex justifyContent="center" mt={6}>
          <Image src="/community.png" width={200} height={200} alt="community" />
        </Flex>
        <Text mt={6} color="gray.600" fontSize="sm">
          TechHustlers PH is a community that aims to promote tech products built for Filipinos.
          Tech startups, web and mobile apps, e-commerce sites, and all software-related products
          are welcome to showcase their apps here.
        </Text>
        {loginBtn}
        <Text fontWeight="700" color="green.500" fontSize="lg" mt={12}>
          Be discovered.
        </Text>
        <Text fontWeight="700" color="green.500" fontSize="lg" mt={2}>
          Receive feedback.
        </Text>
        <Text fontWeight="700" color="green.500" fontSize="lg" mt={2}>
          Get inspired.
        </Text>
        <Text fontWeight="700" color="blue.600" fontSize="2xl" letterSpacing="1px" mt={12}>
          Got an App?
        </Text>
        <Text mt={8} color="gray.600" fontSize="sm">
          Let&apos;s build this community together.
        </Text>
        <Box textAlign="center">
          <Button
            colorScheme="blue"
            size="md"
            onClick={handleClickSubmitAnApp}
            width="100%"
            maxWidth="350px"
            mt={8}
          >
            Submit an App
          </Button>
        </Box>
      </Box>
    </Wrapper>
  );
};

HomeRightSide.propTypes = {};

HomeRightSide.defaultProps = {};

export default observer(HomeRightSide);
