import React from 'react';
import momentTz from 'moment-timezone';
import { initializeApollo } from 'core/apollo/createApolloClient';
import Home from 'mods/website/apps/containers/Home/Home';
import AppsQry from 'mods/website/apps/gql/AppsQry';
import { APPS_PAGE_SIZE } from 'mods/website/apps/containers/Home/components/AppsByMonth';

const HomePage = (initialGqlState) => <Home data={initialGqlState} />;

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo(null, ctx);
  const startOfMonth = momentTz().tz('Asia/Manila').startOf('month');
  const endOfMonth = startOfMonth.clone().endOf('month');

  await apolloClient.query({
    query: AppsQry,
    variables: {
      otherFilters: ['isFeatured'],
    },
  });
  await apolloClient.query({
    query: AppsQry,
    variables: {
      publishedFromDate: startOfMonth.toISOString(),
      publishedToDate: endOfMonth.toISOString(),
      page: 1,
      pageSize: APPS_PAGE_SIZE,
      otherFilters: ['excludeFeatured'],
      sortBy: 'publishedDate',
    },
  });

  return {
    props: { initialApolloState: apolloClient.cache.extract() },
  };
}

export default HomePage;
