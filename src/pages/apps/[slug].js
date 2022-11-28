import React from 'react';
import App from 'mods/website/apps/containers/App';
import { initializeApollo } from 'core/apollo/createApolloClient';
import AppQry from 'mods/website/apps/gql/AppQry';

const AppDetailsPage = (initialGqlState) => <App data={initialGqlState} />;

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo(null, ctx);

  await apolloClient.query({
    query: AppQry,
    variables: { slug: ctx.params.slug },
  });

  return {
    props: { data: apolloClient.cache.extract() },
  };
}

export default AppDetailsPage;
