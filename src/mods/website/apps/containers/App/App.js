import React from 'react';
import { useQuery } from '@apollo/client';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import sortBy from 'lodash/sortBy';
import Head from 'next/head';
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import WebsiteLayout from 'mods/website/components/WebsiteLayout';
import getPageTitle from 'core/utils/getPageTitle';
import AppDetails from 'mods/website/components/AppDetails';
import AppQry from '../../gql/AppQry';

const App = () => {
  const router = useRouter();

  const { slug } = router.query;

  const baseUrl = `${process.env.NEXT_PUBLIC_TH_CLIENT_BASE_URL}`;

  const { data } = useQuery(AppQry, {
    variables: { slug },
    skip: !slug,
  });

  const app = data?.app;

  let appDetails = null;
  let ogImageUrl = '';
  let title = '...';
  if (data) {
    appDetails = <AppDetails app={app} isPreview={false} />;
    title = app.name;
    if (app.bannerImgs.length) {
      const sortedBannerImgs = sortBy(app.bannerImgs, 'order');
      ogImageUrl = sortedBannerImgs[0].image.large;
    } else {
      ogImageUrl = app.logoImg.large;
    }
  }

  let ogImageMeta = null;
  if (ogImageUrl) {
    ogImageMeta = <meta name="og:image" content={ogImageUrl} />;
  }

  let appBcItem = (
    <BreadcrumbItem isCurrentPage isLastChild>
      <BreadcrumbLink>...</BreadcrumbLink>
    </BreadcrumbItem>
  );

  if (app) {
    appBcItem = (
      <BreadcrumbItem isCurrentPage isLastChild>
        <NextLink href={`/apps/${app.slug}`}>{app.name}</NextLink>
      </BreadcrumbItem>
    );
  }

  const breadcrumbs = (
    <Box mb={4}>
      <Breadcrumb fontSize="sm">
        <BreadcrumbItem>
          <NextLink href="/">Home</NextLink>
        </BreadcrumbItem>
        {appBcItem}
      </Breadcrumb>
    </Box>
  );

  return (
    <WebsiteLayout>
      <Head>
        <title>{getPageTitle(title)}</title>
        <meta name="og:url" key="og:url" content={`${baseUrl}/apps/${slug}`} />
        <meta name="og:type" key="og:type" content="product" />
        <meta
          name="og:title"
          key="og:title"
          content={`${title} - ${app?.shortDesc} - TechHustlers PH`}
        />
        <meta
          name="og:description"
          key="og:description"
          content={`${app?.textDesc?.slice(0, 120)}...`}
        />
        {ogImageMeta}
      </Head>
      <div>
        {breadcrumbs}
        {appDetails}
      </div>
    </WebsiteLayout>
  );
};

export default App;
