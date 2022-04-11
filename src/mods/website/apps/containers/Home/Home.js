/* eslint-disable no-await-in-loop */
import React, { useCallback, useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { Box, Flex, Heading, Text, useBreakpointValue } from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';
import WebsiteLayout from '../../../components/WebsiteLayout';
import AppsQry from '../../gql/AppsQry';
import App from './components/App';
import AppsByMonth, { APPS_PAGE_SIZE } from './components/AppsByMonth';
import AppSkeleton from './components/AppSkeleton';

const Home = () => {
  const apolloClient = useApolloClient();

  const [isLoadingFeaturedApps, setIsLoadingFeaturedApps] = useState(true);
  const [isLoadingInitialApps, setIsLoadingInitialApps] = useState(true);
  const [featuredApps, setFeaturedApps] = useState([]);
  const [appsByMonth, setAppsByMonth] = useState([]);
  const [hasMoreApps, setHasMoreApps] = useState(true);

  useEffect(() => {
    const getFeaturedApps = async () => {
      // Do not hide sponsored apps so ensure to fetch them all
      let hasMoreFeatured = true;
      let page = 1;
      let loadedCount = 0;
      while (hasMoreFeatured) {
        const { data } = await apolloClient.query({
          query: AppsQry,
          variables: { otherFilters: ['isFeatured'], page, pageSize: APPS_PAGE_SIZE },
        });
        const { totalCount = 0, nodes = [] } = data.apps;
        if (nodes.length) {
          setFeaturedApps((c) => [...c, ...nodes]);
        }
        loadedCount += nodes.length;
        page += 1;
        if (loadedCount >= totalCount) {
          hasMoreFeatured = false;
        }
      }
      setIsLoadingFeaturedApps(false);
    };

    const getAppsByMonth = async () => {
      let loadedCount = 0;
      let startOfMonth = moment().startOf('month');
      let shouldGetMore = true;
      while (shouldGetMore) {
        const endOfMonth = startOfMonth.clone().endOf('month');
        const { data } = await apolloClient.query({
          query: AppsQry,
          variables: {
            publishedFromDate: startOfMonth.toISOString(),
            publishedToDate: endOfMonth.toISOString(),
            otherFilters: ['excludeFeatured'],
            page: 1,
            pageSize: APPS_PAGE_SIZE,
          },
          fetchPolicy: 'network-only',
        });
        const updateAppsByMonthState = (inputDate, inputApps, inputTotalCount) => {
          setAppsByMonth((c) => [
            ...c,
            {
              month: inputDate.format(),
              apps: inputApps,
              totalCount: inputTotalCount,
            },
          ]);
        };
        const { nodes = [], totalCount = 0 } = data.apps;
        if (nodes.length) {
          updateAppsByMonthState(startOfMonth, nodes, totalCount);
        }
        loadedCount += nodes.length;
        startOfMonth = startOfMonth.clone().subtract(1, 'days').startOf('month');
        if (loadedCount > 5 || startOfMonth.isBefore(moment().subtract(6, 'months'))) {
          shouldGetMore = false;
        }
      }
      setIsLoadingInitialApps(false);
    };

    getFeaturedApps();
    getAppsByMonth();
  }, []);

  const handleLoadMoreApps = useCallback(async () => {
    let loadedCount = 0;
    let startOfMonth = moment(appsByMonth[appsByMonth.length - 1].month)
      .subtract(1, 'days')
      .startOf('month');
    let shouldGetMore = true;
    while (shouldGetMore) {
      const endOfMonth = startOfMonth.clone().endOf('month');
      const { data } = await apolloClient.query({
        query: AppsQry,
        variables: {
          publishedFromDate: startOfMonth.toISOString(),
          publishedToDate: endOfMonth.toISOString(),
          otherFilters: ['excludeFeatured'],
          page: 1,
          pageSize: APPS_PAGE_SIZE,
        },
        fetchPolicy: 'network-only',
      });
      const updateAppsByMonthState = (inputDate, inputApps, inputTotalCount) => {
        setAppsByMonth((c) => [
          ...c,
          {
            month: inputDate.format(),
            apps: inputApps,
            totalCount: inputTotalCount,
          },
        ]);
      };
      const { nodes = [], totalCount = 0 } = data.apps;
      if (nodes.length) {
        updateAppsByMonthState(startOfMonth, nodes, totalCount);
      }
      loadedCount += nodes.length;
      startOfMonth = startOfMonth.clone().subtract(1, 'days').startOf('month');
      if (loadedCount > 2) {
        shouldGetMore = false;
      }
      if (startOfMonth.isBefore(moment().subtract(24, 'months'))) {
        shouldGetMore = false;
        setHasMoreApps(false);
      }
    }
  }, [appsByMonth]);

  let appsList = (
    <>
      <AppSkeleton />
      <AppSkeleton />
      <AppSkeleton />
    </>
  );

  if (!isLoadingInitialApps && !isLoadingFeaturedApps) {
    let featuredAppsComp = null;
    if (featuredApps.length) {
      featuredAppsComp = (
        <>
          <Text mt={16} mb={8} fontSize="xl" fontWeight="500">
            Featured
          </Text>
          {featuredApps.map((app) => (
            <App key={app._id} app={app} />
          ))}
        </>
      );
    }

    let appsByMonthComp = null;
    if (appsByMonth.length) {
      appsByMonthComp = appsByMonth.map((m) => <AppsByMonth key={m} {...m} />);
    }

    appsList = (
      <InfiniteScroll
        initialLoad={false}
        loadMore={handleLoadMoreApps}
        hasMore={hasMoreApps}
        loader={<AppSkeleton />}
        useWindow
      >
        {featuredAppsComp}
        {appsByMonthComp}
      </InfiniteScroll>
    );
  }

  const rightColDisplay = useBreakpointValue({ base: 'none', lg: 'block' });

  return (
    <WebsiteLayout>
      <Box width="100%">
        <Flex width="100%" justifyContent="space-between">
          <Box width="100%">
            <Heading as="h3" size="lg" fontWeight="500">
              Get to know the Philippine Tech scene
            </Heading>
            <Box mt={8} width="100%">
              {appsList}
            </Box>
          </Box>
          <Box flexGrow="1" ml="4rem" style={{ display: rightColDisplay }} maxWidth="350px">
            <Text textTransform="uppercase" fontWeight="bold">
              This platform
            </Text>
            <Text mt={8} mb={8} color="gray.600" fontSize="sm">
              <strong>Tech Hustlers</strong> is a community that aims to promote tech products built
              for Filipinos. Tech startups, web and mobile apps, e-commerce sites, and all
              software-related products are welcome to showcase their apps here.
            </Text>
            <hr />
            <Text mt={8} color="gray.600" fontSize="sm">
              This site is still under heavy development. We are working hard to ship more features
              to improve your eperience in this site.
            </Text>
          </Box>
        </Flex>
      </Box>
    </WebsiteLayout>
  );
};

export default Home;
