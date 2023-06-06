/* eslint-disable no-await-in-loop */
import React, { useCallback, useEffect, useState, useRef } from 'react';
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
import momentTz from 'moment-timezone';
import { useQuery } from '@apollo/client';
import { SortAscendingOutlined } from '@ant-design/icons';
import WebsiteLayout from '../../../components/WebsiteLayout';
import AppsQry from '../../gql/AppsQry';
import App from './components/App';
import AppsByMonth, { APPS_PAGE_SIZE } from './components/AppsByMonth';
import AppSkeleton from './components/AppSkeleton';
import HomeRightSide from './components/HomeRightSide';

const Home = () => {
  const observerTarget = useRef(null);

  const { data: fAppsData } = useQuery(AppsQry, {
    variables: {
      otherFilters: ['isFeatured'],
    },
  });

  const now = momentTz.tz('Asia/Manila');
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

  const [appsByMonth, setAppsByMonth] = useState(iAppsByMonth);
  const [randomApps, setRandomApps] = useState([]);
  const [randomAppsPage, setRandomAppsPage] = useState(1);
  const [hasMoreApps, setHasMoreApps] = useState(true);
  const [isLoadingApps, setIsLoadingApps] = useState(false);
  const [viewMode, setViewMode] = useState('mostRecent');

  const fetchMoreAppsByMonth = async (currentAppsByMonth) => {
    let loadedCount = 0;
    let startOfMonth = now.clone().startOf('month');
    if (currentAppsByMonth.length) {
      startOfMonth = momentTz(currentAppsByMonth[currentAppsByMonth.length - 1].month)
        .subtract(1, 'days')
        .startOf('month');
    }
    let shouldGetMore = loadedCount < 5;
    let newAppsByMonth = [...currentAppsByMonth];
    while (shouldGetMore) {
      const endOfMonth = startOfMonth.clone().endOf('month');
      const result = await refetchApps({
        publishedFromDate: startOfMonth.toISOString(),
        publishedToDate: endOfMonth.toISOString(),
        otherFilters: ['excludeFeatured'],
        page: 1,
        pageSize: APPS_PAGE_SIZE,
      });
      const { nodes = [], totalCount = 0 } = result?.data.apps;
      if (nodes.length) {
        const prevMonths = newAppsByMonth.map((m) => m.month);
        if (!prevMonths.includes(startOfMonth.format())) {
          newAppsByMonth = [
            ...newAppsByMonth,
            {
              month: startOfMonth.format(),
              apps: nodes,
              totalCount,
            },
          ];
        }
      }
      loadedCount += nodes.length;
      startOfMonth = startOfMonth.clone().subtract(1, 'days').startOf('month');
      if (loadedCount > 5) {
        shouldGetMore = false;
        setAppsByMonth(newAppsByMonth);
      }
      if (startOfMonth.isBefore(momentTz('2023-01-01'))) {
        shouldGetMore = false;
        setHasMoreApps(false);
      }
    }
  };

  const fetchMoreRandomApps = async (currentRandomApps, currentRandomAppsPage) => {
    const result = await refetchApps({
      publishedFromDate: undefined,
      publishedToDate: undefined,
      otherFilters: ['excludeFeatured'],
      page: currentRandomAppsPage,
      pageSize: APPS_PAGE_SIZE,
    });
    const { nodes = [] } = result?.data.apps;
    if (nodes.length) {
      setRandomApps([...currentRandomApps, ...nodes]);
    } else {
      setHasMoreApps(false);
    }
    setRandomAppsPage(currentRandomAppsPage + 1);
  };

  const handleChangeViewMode = async (ev) => {
    const newViewMode = ev.target.value;
    setViewMode(newViewMode);
    setHasMoreApps(true);
    setIsLoadingApps(true);
    if (newViewMode === 'random') {
      setAppsByMonth([]);
      await fetchMoreRandomApps([], 1);
    } else {
      setRandomApps([]);
      setRandomAppsPage(1);
      await fetchMoreAppsByMonth([]);
    }
    setIsLoadingApps(false);
  };

  const loadMoreApps = useCallback(async () => {
    setIsLoadingApps(true);
    if (viewMode === 'mostRecent') {
      await fetchMoreAppsByMonth(appsByMonth);
    } else if (viewMode === 'random') {
      await fetchMoreRandomApps(randomApps, randomAppsPage);
    }
    setIsLoadingApps(false);
  }, [viewMode, randomAppsPage, randomApps, appsByMonth]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMoreApps && !isLoadingApps) {
          loadMoreApps();
        }
      },
      { threshold: 1 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, loadMoreApps, isLoadingApps, hasMoreApps]);

  const mobilePlatformInfo = useBreakpointValue(
    { base: <HomeRightSide />, lg: null },
    { fallback: 'lg' },
  );

  let featuredAppsComp = null;

  if (fAppsData?.apps.nodes.length) {
    featuredAppsComp = (
      <>
        <Text mt={10} mb={6} fontSize="xl" fontWeight="500">
          Featured
        </Text>
        {fAppsData.apps.nodes.map((app) => (
          <App key={app._id} app={app} />
        ))}
      </>
    );
  }

  let appItems = null;
  if (viewMode === 'mostRecent') {
    appItems = appsByMonth.map((m) => <AppsByMonth key={m.month} {...m} />);
  } else if (viewMode === 'random') {
    appItems = (
      <>
        <Text mt={6} mb={6} fontSize="xl" fontWeight="500">
          All Apps
        </Text>
        {randomApps.map((app) => (
          <App key={app._id} app={app} />
        ))}
      </>
    );
  }

  let appsloadingComp = null;
  if (isLoadingApps) {
    appsloadingComp = (
      <>
        <AppSkeleton />
        <AppSkeleton />
        <AppSkeleton />
      </>
    );
  }

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
            <Box width="100%">
              {featuredAppsComp}
              {mobilePlatformInfo}
              <Flex justifyContent="center" mt={8}>
                <HStack spacing={4}>
                  <Text>
                    <Icon as={SortAscendingOutlined} /> Browse by
                  </Text>
                  <Select
                    width="200px"
                    color="gray.500"
                    value={viewMode}
                    onChange={handleChangeViewMode}
                  >
                    <option value="mostRecent">Most Recent</option>
                    <option value="random">Random</option>
                  </Select>
                </HStack>
              </Flex>
              {appItems}
              {appsloadingComp}
              <div ref={observerTarget} />
            </Box>
          </Box>
          {useBreakpointValue({ base: null, lg: <HomeRightSide /> }, { fallback: 'lg' })}
        </Flex>
      </Box>
    </WebsiteLayout>
  );
};

export default Home;
