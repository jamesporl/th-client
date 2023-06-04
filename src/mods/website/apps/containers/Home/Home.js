/* eslint-disable no-await-in-loop */
import React, { useCallback, useState } from 'react';
import {
  Box,
  Flex,
  HStack,
  Heading,
  Icon,
  Select,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';
import { useQuery } from '@apollo/client';
import { SortAscendingOutlined } from '@ant-design/icons';
import WebsiteLayout from '../../../components/WebsiteLayout';
import AppsQry from '../../gql/AppsQry';
import App from './components/App';
import AppsByMonth, { APPS_PAGE_SIZE } from './components/AppsByMonth';
import AppSkeleton from './components/AppSkeleton';
import HomeRightSide from './components/HomeRightSide';

const Home = () => {
  const [hasMoreApps, setHasMoreApps] = useState(true);
  const [isLoadingApps, setIsLoadingApps] = useState(false);

  const { data: fAppsData } = useQuery(AppsQry, {
    variables: {
      otherFilters: ['isFeatured'],
    },
  });

  const now = moment();
  const iStartOfMonth = now.clone().startOf('month');
  const iEndOfMonth = iStartOfMonth.clone().endOf('month');
  const { data: appsData, refetch: refetchApps } = useQuery(AppsQry, {
    variables: {
      publishedFromDate: iStartOfMonth.toISOString(),
      publishedToDate: iEndOfMonth.toISOString(),
      page: 1,
      pageSize: APPS_PAGE_SIZE,
      otherFilters: ['excludeFeatured'],
    },
  });

  let iAppsByMonth = [];
  if (appsData) {
    iAppsByMonth = [
      {
        month: iStartOfMonth.toISOString(),
        apps: appsData.apps.nodes,
        totalCount: appsData.apps.totalCount,
      },
    ];
  }

  const initialLoadedCount =
    (fAppsData?.apps.nodes.length || 0) + (iAppsByMonth?.[0]?.apps?.length || 0);

  const [appsByMonth, setAppsByMonth] = useState(iAppsByMonth);

  const handleLoadMoreApps = useCallback(async () => {
    setIsLoadingApps(true);
    if (!isLoadingApps) {
      let startOfMonth = now.clone().startOf('month');
      let loadedCount = initialLoadedCount;
      if (appsByMonth.length) {
        startOfMonth = moment(appsByMonth[appsByMonth.length - 1].month)
          .subtract(1, 'days')
          .startOf('month');
        loadedCount = 0;
      }
      let shouldGetMore = loadedCount < 5;
      while (shouldGetMore) {
        const endOfMonth = startOfMonth.clone().endOf('month');
        const result = await refetchApps({
          publishedFromDate: startOfMonth.toISOString(),
          publishedToDate: endOfMonth.toISOString(),
          otherFilters: ['excludeFeatured'],
          page: 1,
          pageSize: APPS_PAGE_SIZE,
        });
        const updateAppsByMonthState = (inputDate, inputApps, inputTotalCount) => {
          setAppsByMonth((prev) => {
            const prevMonths = prev.map((m) => m.month);
            if (!prevMonths.includes(inputDate.format())) {
              return [
                ...prev,
                {
                  month: inputDate.format(),
                  apps: inputApps,
                  totalCount: inputTotalCount,
                },
              ];
            }
            return prev;
          });
        };
        const { nodes = [], totalCount = 0 } = result?.data.apps;
        if (nodes.length) {
          updateAppsByMonthState(startOfMonth, nodes, totalCount);
        }
        loadedCount += nodes.length;
        startOfMonth = startOfMonth.clone().subtract(1, 'days').startOf('month');
        if (loadedCount > 5) {
          shouldGetMore = false;
        }
        if (startOfMonth.isBefore(moment('2023-01-01'))) {
          shouldGetMore = false;
          setHasMoreApps(false);
        }
      }
      setIsLoadingApps(false);
    }
  }, [appsByMonth, isLoadingApps]);

  let appsList = (
    <>
      <AppSkeleton />
      <AppSkeleton />
      <AppSkeleton />
    </>
  );

  const mobilePlatformInfo = useBreakpointValue(
    { base: <HomeRightSide />, lg: null },
    { fallback: 'lg' },
  );

  let featuredAppsComp = null;

  if (fAppsData?.apps.nodes.length) {
    featuredAppsComp = (
      <>
        <Text mt={6} mb={6} fontSize="xl" fontWeight="500">
          Featured
        </Text>
        {fAppsData.apps.nodes.map((app) => (
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
      loadMore={handleLoadMoreApps}
      hasMore={hasMoreApps}
      loader={<AppSkeleton />}
      initialLoad
      useWindow
    >
      {featuredAppsComp}
      {mobilePlatformInfo}
      {appsByMonthComp}
    </InfiniteScroll>
  );

  return (
    <WebsiteLayout>
      <Box width="100%">
        <Flex width="100%" justifyContent="space-between">
          <Box width="100%">
            <Heading
              as="h4"
              size="lg"
              fontWeight="700"
              fontSize="3xl"
              color="blackAlpha.900"
              textAlign="center"
            >
              Discover the next tech unicorn here &#127477;&#127469; &#129412;
            </Heading>
            <Flex justifyContent="center" mt={6} onChange={() => undefined}>
              <HStack spacing={4}>
                <Text>
                  <Icon as={SortAscendingOutlined} /> Browse by
                </Text>
                <Select width="200px" color="gray.500" value="mostRecent">
                  <option value="mostRecent">Most Recent</option>
                  <option value="random">Random</option>
                </Select>
              </HStack>
            </Flex>
            <Box width="100%">{appsList}</Box>
          </Box>
          {useBreakpointValue({ base: null, lg: <HomeRightSide /> }, { fallback: 'lg' })}
        </Flex>
      </Box>
    </WebsiteLayout>
  );
};

export default Home;
