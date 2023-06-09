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
  useBreakpointValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import Head from 'next/head';
import styled from 'styled-components';
import { MailOutlined, MessageOutlined, ProfileOutlined, RocketOutlined } from '@ant-design/icons';
import getPageTitle from 'core/utils/getPageTitle';
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
    transform: translate(0, -50%);
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

const AboutUs = () => {
  const baseUrl = `${process.env.NEXT_PUBLIC_TH_CLIENT_BASE_URL}`;
  const featsContainerCols = useBreakpointValue(
    { base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' },
    { fallback: 'md' },
  );
  const mainLine1FontSize = useBreakpointValue({ base: '7xl', xl: '8xl' }, { fallback: 'md' });
  const mainLine2FontSize = useBreakpointValue({ base: '6xl', xl: '7xl' }, { fallback: 'md' });
  const aboutHeroPl = useBreakpointValue(
    { base: '0.5rem', md: '1rem', lg: '2rem', xl: '2rem' },
    { fallback: 'md' },
  );
  const aboutHeroTextAlign = useBreakpointValue({ base: 'center', md: 'left' }, { fallback: 'md' });
  const ctaJc = useBreakpointValue({ base: 'center', md: 'flex-start' }, { fallback: 'md' });

  return (
    <Wrapper>
      <WebsiteNavbar />
      <Head>
        <title>{getPageTitle('About Us')}</title>
        <meta name="og:url" key="og:url" content={`${baseUrl}/site/about-us`} />
      </Head>
      <div className="about-hero-container">
        <div className="about-hero-bg" />
        <Box className="about-hero" pl={aboutHeroPl} textAlign={aboutHeroTextAlign}>
          <Flex flexDir="column">
            <Text
              fontSize={mainLine1FontSize}
              fontWeight="extrabold"
              mt={8}
              color="blackAlpha.900"
              as="span"
            >
              Local Tech Products
            </Text>
            <Text fontSize={mainLine2FontSize} fontWeight="extrabold" color="blackAlpha.900">
              in one place
            </Text>
            <Text fontSize="2xl" color="blackAlpha.800" mt={8}>
              See new apps and upcoming startups in the growing tech scene of the Philippines
            </Text>
            <HStack spacing={4} mt={8} justifyContent={ctaJc}>
              <NextLink href="/account/login" passHref legacyBehavior>
                <Button size="lg" colorScheme="blue">
                  Join our Community
                </Button>
              </NextLink>
              <NextLink href="/" passHref legacyBehavior>
                <Button size="lg" colorScheme="blue">
                  Browse Apps
                </Button>
              </NextLink>
            </HStack>
          </Flex>
        </Box>
      </div>
      <Box backgroundColor="green.500">
        <div className="content-container">
          <div className="child-container">
            <Box textAlign="center" pt={16} pb={16} color="white">
              <Grid templateColumns={featsContainerCols} gap={6}>
                <GridItem w="100%" textAlign="center">
                  <Flex justifyContent="center" alignItems="center">
                    <Flex textAlign="center" maxWidth="350px" flexDir="column">
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
                    </Flex>
                  </Flex>
                </GridItem>
                <GridItem w="100%">
                  <Flex justifyContent="center" alignItems="center">
                    <Flex textAlign="center" maxWidth="350px" flexDir="column">
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
                    </Flex>
                  </Flex>
                </GridItem>
                <GridItem w="100%">
                  <Flex justifyContent="center" alignItems="center">
                    <Flex textAlign="center" maxWidth="350px" flexDir="column">
                      <Text fontSize="4xl" fontWeight="bold">
                        <RocketOutlined />
                      </Text>
                      <Text fontSize="2xl" fontWeight="bold" mt={4}>
                        get inspired
                      </Text>
                      <Text mt={4}>
                        See what others are up and find your way to contribute to the growing
                        Philippine tech startup community.
                      </Text>
                    </Flex>
                  </Flex>
                </GridItem>
              </Grid>
            </Box>
          </div>
        </div>
      </Box>
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
                    and good quality images and screenshots. TechHustlers PH admins reserve the
                    right to decline submissions not meeting our standards.
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
              We will be more than happy to help you get published in our platform. Please send us
              an e-mail at
            </Text>
            <Text fontSize="xl" fontWeight="bold" mt={8}>
              <MailOutlined /> &nbsp; admin@techhustlers.ph
            </Text>
          </Box>
        </div>
      </div>
    </Wrapper>
  );
};

export default AboutUs;
