import React from 'react';
import { Flex, Button, HStack, Text, Box } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import WebsiteLayout from '../components/WebsiteLayout';

const Wrapper = styled.div``;

const AboutUs = () => (
  //
  <WebsiteLayout>
    <Helmet title="About Us" />
    <Wrapper>
      <Flex mt={8} justifyContent="center" alignItems="center" flexDir="column">
        <Text fontSize="6xl" fontWeight="extrabold">
          Philippine Tech Products
        </Text>
        <Text fontSize="6xl" fontWeight="extrabold">
          in a single place
        </Text>
        <Text fontSize="3xl" color="gray.400" mt={8}>
          A platform for tech hustlers to showcase made apps
        </Text>
        <Text fontSize="3xl" color="gray.400">
          for the rest of the community to support
        </Text>
        <HStack spacing={4} mt={8}>
          <Button size="lg" colorScheme="blue">
            Join our Community
          </Button>
          <Button size="lg" colorScheme="teal" variant="outline">
            Browse apps
          </Button>
        </HStack>
      </Flex>
      <hr style={{ margin: '5rem 0' }} />
      <Box textAlign="center">
        <Text fontSize="5xl">Be discovered</Text>
        <Text fontSize="2xl" color="gray.400" mt={2}>
          Our main mission is to provide business and teams a place where potential users or
          customers are easy to find them.
        </Text>
        <Text fontSize="5xl">Get feedback</Text>
        <Text fontSize="2xl" color="gray.400" mt={2}>
          We encourage our members to provide feedback on apps listed on the platfom through a
          healthy discussion.
        </Text>
        <Text fontSize="5xl">Get inspired</Text>
        <Text fontSize="2xl" color="gray.400" mt={2}>
          When we see how others are motivated to make ideas into reality, are we not motivated
          ourselves?
        </Text>
      </Box>
    </Wrapper>
  </WebsiteLayout>
);

export default AboutUs;
