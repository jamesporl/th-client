import React from 'react';
import { initializeApollo } from 'core/apollo/createApolloClient';
import AppTagQry from 'mods/website/profile/gql/AppTagQry';
import Category from 'mods/website/apps/containers/Category';
import { CAT_PAGE_APPS_PAGE_SIZE } from 'mods/website/apps/containers/Category/Category';
import AppsQry from 'mods/website/apps/gql/AppsQry';

const CategoryPage = (initialGqlState) => <Category data={initialGqlState} />;

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo(null, ctx);

  await apolloClient.query({ query: AppTagQry, variables: { slug: ctx.params.slug } });
  await apolloClient.query({
    query: AppsQry,
    variables: {
      tagSlug: ctx.params.slug,
      otherFilters: ['isFeatured'],
    },
  });
  await apolloClient.query({
    query: AppsQry,
    variables: {
      tagSlug: ctx.params.slug,
      page: 1,
      pageSize: CAT_PAGE_APPS_PAGE_SIZE,
      otherFilters: ['excludeFeatured'],
      sortBy: 'publishedDate',
    },
  });

  return {
    props: { initialApolloState: apolloClient.cache.extract() },
  };
}

export default CategoryPage;
