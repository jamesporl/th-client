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
import { MailOutlined, MessageOutlined, ProfileOutlined, RocketOutlined } from '@ant-design/icons';
import WebsiteNavbar from '../components/WebsiteLayout/WebsiteNavbar';

const Wrapper = styled.div`
  .about-hero-container {
    position: relative;
  }

  .about-hero-bg {
    padding-top: 60px;
    height: 800px;
    background-image: url('/about-bg.jpg');
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
  }
  .about-hero {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }

  .features-container {
    background-color: #e53e3e;
  }

  .content-container {
    display: flex;
    justify-content: center;
    padding-left: 1rem;
    padding-right: 1rem;

    .child-container {
      width: 100%;
      max-width: 1100px;
    }
  }

  ul,
  ol {
    margin: revert;
    padding: revert;
  }
`;

const AboutUs = () => (
  <Wrapper>
    <WebsiteNavbar />
    <Helmet title="About Us" />
    <div className="about-hero-container">
      <div className="about-hero-bg" />
      <div className="about-hero">
        <Flex justifyContent="center" alignItems="center" flexDir="column">
          <Text fontSize="7xl" fontWeight="extrabold" mt={8} color="yellow.400" as="span">
            Local Tech Products
          </Text>
          <Text fontSize="5xl" fontWeight="extrabold" color="yellow.400">
            in one place
          </Text>
          <Text fontSize="2xl" color="white" mt={8}>
            See new apps and upcoming startups in the growing tech scene of the Philippines
          </Text>
          <HStack spacing={4} mt={8}>
            <Button size="lg" colorScheme="blue">
              Join our Community
            </Button>
            <Button size="lg" colorScheme="blue">
              Browse Apps
            </Button>
          </HStack>
        </Flex>
      </div>
    </div>
    <div className="features-container">
      <div className="content-container">
        <div className="child-container">
          <Box textAlign="center" pt={16} pb={16} color="white">
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
              <GridItem w="100%">
                <Box textAlign="center">
                  <Text fontSize="4xl" fontWeight="bold">
                    <ProfileOutlined />
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold" mt={4}>
                    be discovered
                  </Text>
                  <Text mt={4}>
                    Our main mission is to provide businesses and teams a place where potential
                    users or customers are easy to find them.
                  </Text>
                </Box>
              </GridItem>
              <GridItem w="100%">
                <Box textAlign="center">
                  <Text fontSize="4xl" fontWeight="bold">
                    <MessageOutlined />
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold" mt={4}>
                    receive feedback
                  </Text>
                  <Text mt={4}>
                    We encourage our members to provide feedback on apps listed on the platfom
                    through a healthy discussion.
                  </Text>
                </Box>
              </GridItem>
              <GridItem w="100%">
                <Box textAlign="center">
                  <Text fontSize="4xl" fontWeight="bold">
                    <RocketOutlined />
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
        </div>
      </div>
    </div>
    <div className="content-container">
      <div className="child-container">
        <Box mt={32}>
          <Text fontSize="3xl" fontWeight="bold" color="blue.500">
            Frequently Asked Questions
          </Text>
          <Accordion allowToggle mt={16}>
            <AccordionItem pb={8} pt={8}>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Text fontSize="xl">Is submitting an app free</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={8} pt={8}>
                <Text as="p">Absolutely!</Text>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem pb={8} pt={8}>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Text fontSize="xl">What kind of apps can be submitted?</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={8} pt={8}>
                <Text as="p">
                  We welcome all kinds of apps - be it a web app, a mobile app, or both. Online
                  shops are welcome too, for as long as they are in their own website and not just
                  in a marketplace.
                </Text>
                <br />
                <Text as="p">The following conditions should also be satisfied:</Text>
                <ul>
                  <li>
                    <Text as="p">Must be built by a Filipino team/individual</Text>
                  </li>
                  <li>
                    <Text as="p">
                      Must be accessible to potential users with ready core functionalities to be
                      used or tested
                    </Text>
                  </li>
                </ul>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem pb={8} pt={8}>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Text fontSize="xl">Are app submissions being reviewed?</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={8} pt={8}>
                <Text as="p">
                  Yes. To ensure the quality of content in our site, all app submissions are being
                  queued for review. We require apps to have good descriptions, appropriate tags,
                  and good quality images and screenshots. TechHustlers admins reserve the right to
                  decline submissions not meeting our standards.
                </Text>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
        <Box mt={32} mb={32} textAlign="center">
          <Text fontSize="3xl" fontWeight="bold" color="blue.500">
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
      </div>
    </div>
  </Wrapper>
);

export default AboutUs;
