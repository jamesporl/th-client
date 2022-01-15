import React from 'react';
import { useQuery } from '@apollo/client';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  Heading,
  Skeleton,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import WebsiteLayout from '../../../components/WebsiteLayout';
import AppsQry from '../../gql/AppsQry';
import App from './components/App';

const Home = () => {
  const { data, loading } = useQuery(AppsQry);

  let appsList = <Skeleton />;
  if (!loading) {
    appsList = data?.apps?.nodes.map((app) => <App key={app._id} app={app} />);
  }

  const rightColDisplay = useBreakpointValue({ base: 'none', lg: 'block' });

  return (
    <WebsiteLayout>
      <Box width="100%">
        <Flex width="100%" justifyContent="space-between">
          <Box width="100%">
            <Heading as="h3" size="md">
              A showcase of what the PH Tech scene is made of
            </Heading>
            <Box mt={8} width="100%">
              {appsList}
            </Box>
          </Box>
          <Box flexGrow="1" ml="2rem" style={{ display: rightColDisplay }} maxWidth="300px">
            <Heading as="h4" size="md">
              This platform
            </Heading>
            <Text mt={8}>
              <strong>Tech Hustlers</strong> is a community that aims to promote tech products built
              for Filipinos. Tech startups, web and mobile apps, e-commerce site owners, and
              software development teams are welcome to showcase their services here.
            </Text>
            <Alert
              status="info"
              mt={8}
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
            >
              <AlertIcon boxSize="24px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                We are in Beta.
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                This site is still under heavy development. We are working hard to ship more
                features to improve your eperience in this site.
              </AlertDescription>
            </Alert>
          </Box>
        </Flex>
      </Box>
    </WebsiteLayout>
  );
};

export default Home;
