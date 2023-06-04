import React, { useCallback, useState } from 'react';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Flex,
  Heading,
  HStack,
  Icon,
  Select,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import WebsiteLayout from 'mods/website/components/WebsiteLayout';
import { useQuery } from '@apollo/client';
import AppTagQry from 'mods/website/profile/gql/AppTagQry';
import InfiniteScroll from 'react-infinite-scroller';
import { SortAscendingOutlined } from '@ant-design/icons';
import Head from 'next/head';
import getPageTitle from 'core/utils/getPageTitle';
import HomeRightSide from '../Home/components/HomeRightSide';
import AppSkeleton from '../Home/components/AppSkeleton';
import AppsQry from '../../gql/AppsQry';
import App from '../Home/components/App';

export const CAT_PAGE_APPS_PAGE_SIZE = 3;

const Category = () => {
  const [sortBy, setSortBy] = useState('publishedDate');
  const baseUrl = `${process.env.NEXT_PUBLIC_TH_CLIENT_BASE_URL}`;

  const router = useRouter();

  const { slug } = router.query;

  const { data: appTagData } = useQuery(AppTagQry, { variables: { slug }, skip: !slug });
  const { data: fAppsData } = useQuery(AppsQry, {
    variables: {
      tagSlug: slug,
      otherFilters: ['isFeatured'],
    },
  });
  const { data: appsData, refetch: refetchApps } = useQuery(AppsQry, {
    variables: {
      tagSlug: slug,
      page: 1,
      pageSize: CAT_PAGE_APPS_PAGE_SIZE,
      otherFilters: ['excludeFeatured'],
      sortBy,
    },
    skip: !slug,
  });

  const [apps, setApps] = useState(appsData?.apps.nodes || []);
  const [shouldDoInitialLoad] = useState(!appsData);

  let initialHasMoreApps = true;
  if (appsData) {
    initialHasMoreApps = appsData.apps.nodes.length < appsData.apps.totalCount;
  }
  const [page, setPage] = useState(1);
  const [hasMoreApps, setHasMoreApps] = useState(initialHasMoreApps);

  const handleChangeSortBy = async (ev) => {
    setSortBy(ev.target.value);
    setApps([]);
    setPage(1);
    const result = await refetchApps({
      page: 1,
      sortBy: ev.target.value,
    });
    setApps(result.data.apps.nodes);
    setHasMoreApps(result.data.apps.nodes.length < result.data.apps.totalCount);
  };

  const loadMoreApps = useCallback(async () => {
    const result = await refetchApps({
      page: page + 1,
      sortBy,
    });
    setApps((prevApps) => [...prevApps, ...result.data.apps.nodes]);
    setHasMoreApps(apps.length + result.data.apps.nodes.length < result.data.apps.totalCount);
    setPage(page + 1);
  }, [page, sortBy, apps]);

  let title = '...';
  if (appTagData?.appTag) {
    title = appTagData.appTag.name;
  }

  let appsList = (
    <>
      <AppSkeleton />
      <AppSkeleton />
      <AppSkeleton />
    </>
  );

  let featuredAppsComp = null;
  if (fAppsData && fAppsData.apps.nodes.length) {
    featuredAppsComp = (
      <>
        <Text mt={16} mb={8} fontSize="xl" fontWeight="500">
          Featured
        </Text>
        {fAppsData.apps.nodes.map((app) => (
          <App key={app._id} app={app} />
        ))}
      </>
    );
  }

  const sortSelector = (
    <Flex justifyContent="flex-end" mt={16} onChange={handleChangeSortBy}>
      <HStack spacing={4}>
        <Text color="gray.500">
          <Icon as={SortAscendingOutlined} /> Sort By
        </Text>
        <Select width="200px" color="gray.500" value={sortBy}>
          <option value="publishedDate">Date Published</option>
          <option value="name">Name</option>
        </Select>
      </HStack>
    </Flex>
  );

  if (apps.length) {
    appsList = (
      <InfiniteScroll
        loadMore={loadMoreApps}
        hasMore={hasMoreApps}
        loader={<AppSkeleton />}
        initialLoad={shouldDoInitialLoad}
        useWindow
      >
        {apps.map((app) => (
          <App key={app._id} app={app} />
        ))}
      </InfiniteScroll>
    );
  }

  return (
    <WebsiteLayout>
      <Head>
        <title>{getPageTitle(title)}</title>
        <meta name="og:url" key="og:url" content={`${baseUrl}/categories/${slug}`} />
        <meta name="og:title" key="og:title" content={getPageTitle(title)} />
      </Head>
      <Box width="100%">
        <Flex width="100%" justifyContent="space-between">
          <Box width="100%">
            <Box mb={4}>
              <Breadcrumb fontSize="sm">
                <BreadcrumbItem>
                  <NextLink href="/">Home</NextLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <NextLink href="/categories">Categories</NextLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage isLastChild>
                  <NextLink href={`/categories/${slug}`}>{title}</NextLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </Box>
            <Heading as="h1" size="lg">
              {title}
            </Heading>
            {featuredAppsComp}
            {sortSelector}
            <Box mt={16}>{appsList}</Box>
          </Box>
          {useBreakpointValue({ base: null, lg: <HomeRightSide /> }, { fallback: 'lg' })}
        </Flex>
      </Box>
    </WebsiteLayout>
  );
};

export default Category;
