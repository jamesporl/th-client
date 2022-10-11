import React from 'react';
import { useQuery } from '@apollo/client';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import WebsiteLayout from 'mods/website/components/WebsiteLayout';
import AppDetails from 'mods/website/components/AppDetails';
import AppQry from '../../gql/AppQry';

const Wrapper = styled.div``;

const App = () => {
  const router = useRouter();

  const { slug } = router.query;

  const { data } = useQuery(AppQry, { variables: { slug }, skip: !slug });

  let appDetails = null;
  let title = '...';
  if (data) {
    appDetails = <AppDetails app={data.app} isPreview={false} />;
    title = data.app.name;
  }

  let appBcItem = (
    <BreadcrumbItem isCurrentPage isLastChild>
      <BreadcrumbLink>...</BreadcrumbLink>
    </BreadcrumbItem>
  );

  if (data) {
    appBcItem = (
      <BreadcrumbItem isCurrentPage isLastChild>
        <BreadcrumbLink>
          <NextLink href={`/apps/${data.app.slug}`}>{data.app.name}</NextLink>
        </BreadcrumbLink>
      </BreadcrumbItem>
    );
  }

  const breadcrumbs = (
    <Box mb={12}>
      <Breadcrumb fontSize="sm">
        <BreadcrumbItem>
          <BreadcrumbLink>
            <NextLink href="/">Home</NextLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {appBcItem}
      </Breadcrumb>
    </Box>
  );

  return (
    <WebsiteLayout>
      <Helmet title={title} />
      <Wrapper>
        {breadcrumbs}
        {appDetails}
      </Wrapper>
    </WebsiteLayout>
  );
};

export default App;
