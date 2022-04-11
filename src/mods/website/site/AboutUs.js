import React from 'react';
import {
  Flex,
  Button,
  HStack,
  Text,
  Box,
  Grid,
  GridItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  AccordionItem,
  Accordion,
} from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { MailOutlined, MessageTwoTone, ProfileTwoTone, RocketTwoTone } from '@ant-design/icons';
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
          in one place
        </Text>
        <Text fontSize="2xl" color="gray.600" mt={8}>
          Where Tech Hustlers showcase the things they build
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
      <Box textAlign="center" mt={32}>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <GridItem w="100%">
            <Box textAlign="center">
              <Text fontSize="4xl" fontWeight="bold">
                <ProfileTwoTone />
              </Text>
              <Text fontSize="2xl" fontWeight="bold" mt={4}>
                be discovered
              </Text>
              <Text mt={4}>
                Our main mission is to provide businesses and teams a place where potential users or
                customers are easy to find them.
              </Text>
            </Box>
          </GridItem>
          <GridItem w="100%">
            <Box textAlign="center">
              <Text fontSize="4xl" fontWeight="bold">
                <MessageTwoTone />
              </Text>
              <Text fontSize="2xl" fontWeight="bold" mt={4}>
                receive feedback
              </Text>
              <Text mt={4}>
                We encourage our members to provide feedback on apps listed on the platfom through a
                healthy discussion.
              </Text>
            </Box>
          </GridItem>
          <GridItem w="100%">
            <Box textAlign="center">
              <Text fontSize="4xl" fontWeight="bold">
                <RocketTwoTone />
              </Text>
              <Text fontSize="2xl" fontWeight="bold" mt={4}>
                get inspired
              </Text>
              <Text mt={4}>
                See what others are up and find your way to contribute to the growing Philippine
                tech startup community.
              </Text>
            </Box>
          </GridItem>
        </Grid>
      </Box>
      <Box mt={32}>
        <Text fontSize="3xl" fontWeight="bold">
          Frequently Asked Questions
        </Text>
        <Accordion allowToggle mt={16}>
          <AccordionItem pb={8} pt={8}>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text fontSize="xl">Who can submit apps in Tech Hustlers?</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={8} pt={8}>
              All apps that can have Filipinos as users or customers are welcome in this platform.
              Apps can either be a web app or a mobile app. Apps should at least be in beta stage -
              users should be able to download or see them and use some features.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem pb={8} pt={8}>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text fontSize="xl">Are apps reviewed before being published?</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={8} pt={8}>
              Yes. We wish to maintain meaningful and useful content in our platform. Tech Hustlers
              admins reserve the right to reject submissions if details are not complete or
              inaccurate. We reach out to app owners through e-mail in case revisions are required.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
      <Box mt={32} mb={32} textAlign="center">
        <Text fontSize="3xl" fontWeight="bold">
          Contact Us
        </Text>
        <Text fontSize="lg" mt={16} color="gray.600">
          We will be more than happy to help you get published in our platform. Please send us an
          e-mail at
        </Text>
        <Text fontSize="xl" fontWeight="bold" mt={8}>
          <MailOutlined /> &nbsp; admin@techhustlers.ph
        </Text>
      </Box>
    </Wrapper>
  </WebsiteLayout>
);

export default AboutUs;
