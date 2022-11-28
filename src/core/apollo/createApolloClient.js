import { useMemo } from 'react';
import { ApolloClient, from, InMemoryCache } from '@apollo/client';
import { ApolloLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { createUploadLink } from 'apollo-upload-client';

let apolloClient;
let graphqlUrl;
if (process.browser) {
  graphqlUrl = process.env.NEXT_PUBLIC_EXTERNAL_GRAPHQL_URL;
} else {
  graphqlUrl = process.env.INTERNAL_GRAPHQL_URL;
}

function createApolloClient(ctx) {
  // eslint-disable-next-line consistent-return
  const errorLink = onError(({ operation, forward, graphQLErrors, networkError }) => {
    // eslint-disable-line consistent-return
    if (graphQLErrors) {
      // eslint-disable-next-line array-callback-return
      graphQLErrors.map(({ message, locations, path }) => {
        const displayMessage = `
          [GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}
        `;
        console.log(displayMessage); // eslint-disable-line no-console
      });
    }
    if (networkError && networkError.statusCode === 404) {
      if (process.browser) {
        // window.location.href = '/';
      }
      operation.setContext({ headers: {} });
      return forward(operation);
    }
  });

  const authLink = setContext(() => {
    let authToken = '';
    if (process.browser) {
      authToken = localStorage.getItem('authToken');
    } else {
      authToken = ctx.ctx?.req.cookies?.authToken;
    }

    if (authToken) {
      return { headers: { authorization: authToken } };
    }
    return { headers: {} };
  });

  const omitTypename = (key, value) => (key === '__typename' ? undefined : value);

  const omitTypenameLink = new ApolloLink((operation, forward) => {
    if (operation.variables) {
      if (
        typeof window !== 'undefined' &&
        (operation.variables.file instanceof File ||
          operation.variables.input?.file instanceof File)
      ) {
        return forward(operation);
      }
      // eslint-disable-next-line no-param-reassign
      operation.variables = JSON.parse(JSON.stringify(operation.variables), omitTypename);
    }
    return forward(operation);
  });

  const uploadLink = createUploadLink({
    uri: graphqlUrl,
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: from([authLink, errorLink, omitTypenameLink, uploadLink]),
    cache: new InMemoryCache({}),
  });
}

/* eslint-disable no-underscore-dangle */
export function initializeApollo(initialState = null, ctx) {
  const _apolloClient = apolloClient ?? createApolloClient(ctx);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
