import React from 'react';
import NextLink from 'next/link';
import { observer } from 'mobx-react';
import { Box, Button, Text, useBreakpointValue } from '@chakra-ui/react';
import useStores from 'core/stores/useStores';
import useClickSubmitAnApp from 'mods/website/hooks/useClickSubmitAnApp';

const HomeRightSide = () => {
  const rightColDisplay = useBreakpointValue({ base: 'none', lg: 'block' });

  const { authStore } = useStores();

  const handleClickSubmitAnApp = useClickSubmitAnApp();

  let loginBtn = null;
  if (!authStore.myProfile) {
    loginBtn = (
      <NextLink href="/account/login">
        <Button colorScheme="blue" size="md" isFullWidth mt={8}>
          Log in or Sign up
        </Button>
      </NextLink>
    );
  }

  return (
    <Box flexGrow="1" ml="4rem" style={{ display: rightColDisplay }} maxWidth="350px">
      <Box borderWidth="1px" padding={4} borderRadius={8} backgroundColor="gray.100">
        <Text fontWeight="700" color="blue.600" fontSize="2xl" letterSpacing="1px">
          This Platform
        </Text>
        <Text mt={8} color="gray.600" fontSize="sm">
          TechHustlers PH is a community that aims to promote tech products built for Filipinos.
          Tech startups, web and mobile apps, e-commerce sites, and all software-related products
          are welcome to showcase their apps here.
        </Text>
        {loginBtn}

        <Text fontWeight="700" color="green.500" fontSize="lg" mt={12}>
          Be discovered.
        </Text>
        <Text fontWeight="700" color="red.300" fontSize="lg" mt={4}>
          Receive feedback.
        </Text>
        <Text fontWeight="700" color="yellow.500" fontSize="lg" mt={4}>
          Get inspired.
        </Text>
        <Text fontWeight="700" color="blue.600" fontSize="2xl" letterSpacing="1px" mt={12}>
          Got an App?
        </Text>
        <Text mt={8} color="gray.600" fontSize="sm">
          Let&apos;s build this community together.
        </Text>
        <Button colorScheme="blue" size="md" onClick={handleClickSubmitAnApp} isFullWidth mt={8}>
          Submit an App
        </Button>
      </Box>
    </Box>
  );
};

HomeRightSide.propTypes = {};

HomeRightSide.defaultProps = {};

export default observer(HomeRightSide);
