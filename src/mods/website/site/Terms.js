import React from 'react';
import { Text } from '@chakra-ui/react';
import Head from 'next/head';
import styled from 'styled-components';
import getPageTitle from 'core/utils/getPageTitle';
import WebsiteLayout from '../components/WebsiteLayout/WebsiteLayout';

const Wrapper = styled.div``;

const Terms = () => {
  const baseUrl = `${process.env.NEXT_PUBLIC_TH_CLIENT_BASE_URL}`;

  return (
    <WebsiteLayout>
      <Head>
        <title>{getPageTitle('Terms and Conditions')}</title>
        <meta name="og:url" key="og:url" content={`${baseUrl}/site/terms-and-conditions`} />
      </Head>
      <Wrapper>
        <Text fontSize="5xl" fontWeight={700} color="blue.500">
          Terms and Conditions
        </Text>
        <Text mt={6}>Thank you for being a part of TechHustlers PH!</Text>
        <Text mt={6}>App submissions are subject to the approval of the admins.</Text>
        <Text mt={6}>
          Any content, inclusive of images, app descriptions, comments should be free of copyright
          issues. You allow those that you have published, like comments and app submissions, to be
          viewed by the public in this website. You allow the public, including TechHustlers PH
          admins, to share those contents in other platforms.
        </Text>
        <Text mt={6}>
          We aim for this platform to be a safe, professional space. All comments must not contain
          hateful remarks towards any app, person, company, or community. Violation of this rule
          will result to your account getting banned.
        </Text>
      </Wrapper>
    </WebsiteLayout>
  );
};

export default Terms;
