import React from 'react';
import { initializeApollo } from 'core/apollo/createApolloClient';
import Categories from 'mods/website/apps/containers/Categories';
import AppTagsQry from 'mods/website/profile/gql/AppTagsQry';

const CategoriesPage = (initialGqlState) => <Categories data={initialGqlState} />;

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo(null, ctx);

  await apolloClient.query({ query: AppTagsQry });

  return {
    props: { initialApolloState: apolloClient.cache.extract() },
  };
}

export default CategoriesPage;
