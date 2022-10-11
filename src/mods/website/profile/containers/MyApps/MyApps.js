import React from 'react';
import { Box, Heading, Skeleton, Text } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import WebsiteLayout from 'mods/website/components/WebsiteLayout';
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
  const { data: draftsData, loading: loadingDrafts } = useQuery(MyAppDraftsQry, {
    fetchPolicy: 'network-only',
  });
  const { data: appsData, loading: loadingApps } = useQuery(MyAppsQry, {
    fetchPolicy: 'network-only',
  });

  const { nodes: drafts = [] } = draftsData?.myAppDrafts || {};
  const { nodes: apps = [] } = appsData?.myApps || {};

  let draftsAndAppsList = <Skeleton />;
  if (!loadingDrafts && !loadingApps) {
    if (!drafts.length && !apps.length) {
      draftsAndAppsList = (
        <Text color="gray.500" fontSize="lg" mt={16}>
          Looks like you do not have apps yet. Submit one!
        </Text>
      );
    } else {
      let draftsList = null;
      if (drafts.length) {
        draftsList = (
          <>
            <Text color="gray.400" fontSize="lg" fontWeight="bold" mt={16}>
              Drafts
            </Text>
            <Text color="gray.400" fontSize="sm">
              Submitted apps are pending the approval of a TechHustler admin. Expect an e-mail from
              us very soon!
            </Text>
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
            <Text color="gray.400" fontSize="lg" fontWeight="bold" mt={16}>
              Published
            </Text>
            <Box mt={8}>
              {apps.map((a) => (
                <div className="app-item">
                  <App app={a} key={a._id} />
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
      <Helmet title="My Apps" />
      <Wrapper>
        <Heading as="h1" size="lg">
          My Apps
        </Heading>
        {draftsAndAppsList}
      </Wrapper>
    </WebsiteLayout>
  );
};
export default MyApps;
