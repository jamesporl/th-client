import React, { useCallback, useEffect, useState, useRef } from 'react';
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
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import WebsiteLayout from 'mods/website/components/WebsiteLayout';
import { useQuery } from '@apollo/client';
import AppTagQry from 'mods/website/profile/gql/AppTagQry';
import { SortAscendingOutlined } from '@ant-design/icons';
import Head from 'next/head';
import styled from 'styled-components';
import getPageTitle from 'core/utils/getPageTitle';
import Image from 'next/image';
import HomeRightSide from '../Home/components/HomeRightSide';
import AppSkeleton from '../Home/components/AppSkeleton';
import AppsQry from '../../gql/AppsQry';
import App from '../Home/components/App';

export const CAT_PAGE_APPS_PAGE_SIZE = 12;

const Wrapper = styled.div`
  width: 100%;

  .this-platform-mobile {
    display: flex;
    width: 100%;

    @media only screen and (min-width: 992px) {
      display: none;
    }
  }

  .this-platform-desktop {
    display: none;

    @media only screen and (min-width: 992px) {
      display: flex;
    }
  }

  .vertical-item {
    &.group {
      margin-top: 2rem;
    }
    &.app {
      margin-top: 1.5rem;
    }
  }
`;

const Category = () => {
  const observerTarget = useRef(null);

  const baseUrl = `${process.env.NEXT_PUBLIC_TH_CLIENT_BASE_URL}`;

  const router = useRouter();

  const { slug } = router.query;

  const [sortBy, setSortBy] = useState('publishedDate');

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
  const [page, setPage] = useState(appsData?.apps.nodes ? 1 : 2);
  const [hasMoreApps, setHasMoreApps] = useState(true);
  const [isLoadingApps, setIsLoadingApps] = useState(false);

  const fetchMoreApps = async (currentApps, currentPage, currentSortBy) => {
    if (currentApps.length && currentPage === 1) {
      return;
    }
    const result = await refetchApps({ page: currentPage, sortBy: currentSortBy });
    const { nodes = [] } = result?.data.apps;
    if (nodes.length) {
      setApps([...currentApps, ...nodes]);
    } else {
      setHasMoreApps(false);
    }
    setPage(currentPage + 1);
  };

  const loadMoreApps = useCallback(async () => {
    setIsLoadingApps(true);
    await fetchMoreApps(apps, page, sortBy);
    setIsLoadingApps(false);
  }, [sortBy, page, apps]);

  let title = '...';
  if (appTagData?.appTag) {
    title = appTagData.appTag.name;
  }

  let appsloadingComp = null;
  if (isLoadingApps) {
    appsloadingComp = (
      <>
        <div className="vertical-item app">
          <AppSkeleton />
        </div>
        <div className="vertical-item app">
          <AppSkeleton />
        </div>
        <div className="vertical-item app">
          <AppSkeleton />
        </div>
      </>
    );
  }

  let appItems = (
    <>
      {apps.map((app) => (
        <div className="vertical-item app" key={app._id}>
          <App app={app} />
        </div>
      ))}
    </>
  );

  if (!apps.length && !isLoadingApps && !hasMoreApps) {
    appItems = (
      <>
        <Box textAlign="center" mt={16}>
          <Text fontWeight={700} fontSize="lg" color="blackAlpha.500">
            It would be nice to have some apps in this category.
          </Text>
        </Box>
        <Flex justifyContent="center" width="100%">
          <Image src="/no-apps.png" width={300} height={300} alt="no-apps" />
        </Flex>
      </>
    );
  }

  const handleChangeSortBy = (ev) => {
    setSortBy(ev.target.value);
    setApps([]);
    setPage(1);
    fetchMoreApps([], 1, ev.target.value);
  };

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

  let featuredAppsComp = null;
  if (fAppsData && fAppsData.apps.nodes.length) {
    featuredAppsComp = (
      <div className="vertical-item group">
        <Text fontSize="xl" fontWeight="500">
          Featured
        </Text>
        {fAppsData.apps.nodes.map((app) => (
          <div className="vertical-item app" key={app._id}>
            <App app={app} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <WebsiteLayout>
      <Head>
        <title>{getPageTitle(title)}</title>
        <meta name="og:url" key="og:url" content={`${baseUrl}/categories/${slug}`} />
        <meta name="og:title" key="og:title" content={getPageTitle(title)} />
      </Head>
      <Wrapper>
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
            <Heading as="h4" size="lg" fontWeight="700" fontSize="3xl" color="blackAlpha.900">
              {title}
            </Heading>
            <Box width="100%">
              {featuredAppsComp}
              <div className="vertical-item group this-platform-mobile">
                <HomeRightSide />
              </div>
              <Flex justifyContent="center" className="vertical-item group">
                <HStack spacing={4}>
                  <Text>
                    <Icon as={SortAscendingOutlined} /> Browse by
                  </Text>
                  <Select
                    width="200px"
                    color="gray.500"
                    value={sortBy}
                    onChange={handleChangeSortBy}
                  >
                    <option value="publishedDate">Most Recent</option>
                    <option value="name">Alphabetical</option>
                    <option value="random">Random</option>
                  </Select>
                </HStack>
              </Flex>
              {appItems}
              {appsloadingComp}
              <div ref={observerTarget} />
            </Box>
          </Box>
          <div className="this-platform-desktop">
            <HomeRightSide />
          </div>
        </Flex>
      </Wrapper>
    </WebsiteLayout>
  );
};

export default Category;
