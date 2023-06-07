import React from 'react';
import { Alert, AlertIcon, Box, Flex, Skeleton, Text } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import Head from 'next/head';
import getPageTitle from 'core/utils/getPageTitle';
import WebsiteLayout from 'mods/website/components/WebsiteLayout';
import Image from 'next/image';
import MyAppDraftsQry from '../../gql/MyAppDraftsQry';
import MyAppsQry from '../../gql/MyAppsQry';
import AppDraft from './components/AppDraft';
import App from './components/App';

const Wrapper = styled.div`
  .app-item:not(:first-child) {
    margin-top: 1rem;
  }
`;

const MyApps = () => {
  const {
    data: draftsData,
    loading: loadingDrafts,
    refetch: refetchAppDrafts,
  } = useQuery(MyAppDraftsQry, {
    fetchPolicy: 'network-only',
  });
  const {
    data: appsData,
    loading: loadingApps,
    refetch: refetchApps,
  } = useQuery(MyAppsQry, {
    fetchPolicy: 'network-only',
  });

  const { nodes: drafts = [] } = draftsData?.myAppDrafts || {};
  const { nodes: apps = [] } = appsData?.myApps || {};

  let draftsAndAppsList = <Skeleton />;
  if (!loadingDrafts && !loadingApps) {
    if (!drafts.length && !apps.length) {
      draftsAndAppsList = (
        <>
          <Flex justifyContent="center">
            <Text color="gray.500" fontSize="lg" mt={16}>
              Looks like you do not have apps yet. Submit one!
            </Text>
          </Flex>
          <Flex justifyContent="center">
            <Image src="/no-apps.png" width={200} height={200} />
          </Flex>
        </>
      );
    } else {
      let draftsList = null;
      if (drafts.length) {
        const hasSubmittedDraft = drafts.find((d) => d.status.key === 'submitted');
        let draftsInfo = null;
        if (hasSubmittedDraft) {
          draftsInfo = (
            <Alert status="info" mt={4}>
              <AlertIcon />
              Submitted apps are pending the approval of a TechHustlers PH admin. Expect an e-mail
              from us very soon!
            </Alert>
          );
        }
        draftsList = (
          <>
            <Text fontSize="xl" fontWeight="bold" mt={16}>
              Drafts
            </Text>
            {draftsInfo}
            <Box mt={8}>
              {drafts.map((d) => (
                <div className="app-item">
                  <AppDraft appDraft={d} key={d._id} className="app-item" />
                </div>
              ))}
            </Box>
          </>
        );
      }

      let appsList = null;
      if (apps.length) {
        appsList = (
          <>
            <Text fontSize="xl" fontWeight="bold" mt={16}>
              Published
            </Text>
            <Box mt={8}>
              {apps.map((a) => (
                <div className="app-item" key={a._id}>
                  <App app={a} refetchApps={refetchApps} refetchAppDrafts={refetchAppDrafts} />
                </div>
              ))}
            </Box>
          </>
        );
      }

      draftsAndAppsList = (
        <>
          {draftsList}
          {appsList}
        </>
      );
    }
  }

  return (
    <WebsiteLayout>
      <Head>
        <title>{getPageTitle('My Apps')}</title>
      </Head>
      <Wrapper>
        <Text fontSize="5xl" fontWeight={700} color="blue.500">
          My Apps
        </Text>
        {draftsAndAppsList}
      </Wrapper>
    </WebsiteLayout>
  );
};
export default MyApps;
