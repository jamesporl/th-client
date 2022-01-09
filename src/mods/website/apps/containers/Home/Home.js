import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, Flex, Heading, Skeleton, Text } from '@chakra-ui/react';
import WebsiteLayout from '../../../components/WebsiteLayout';
import AppsQry from '../../gql/AppsQry';
import App from './components/App';

const Home = () => {
  const { data, loading } = useQuery(AppsQry);

  let appsList = <Skeleton />;
  if (!loading) {
    appsList = data?.apps?.nodes.map((app) => <App key={app._id} app={app} />);
  }

  return (
    <WebsiteLayout>
      <Box width="100%">
        <Flex>
          <Box>
            <Heading as="h3" size="md">
              The next big things in the PH Tech scene
            </Heading>
            <Box mt={8} width="800px">
              {appsList}
            </Box>
          </Box>
          <Box flexGrow="1" ml="2rem">
            <Heading as="h4" size="md">
              This platform
            </Heading>
            <Text mt={8}>
              <strong>Tech Hustlers</strong> is a community that aims to promote tech products built
              for Filipinos by Filipinos. Tech startups, web and mobile apps, e-commerce site
              owners, and software development teams are welcome to showcase their services here.
            </Text>
          </Box>
        </Flex>
      </Box>
    </WebsiteLayout>
  );
};

export default Home;
