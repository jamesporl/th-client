import React, { useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';
import { Helmet } from 'react-helmet';
import { useApollo } from 'core/apollo/createApolloClient';
import useStores from 'core/stores/useStores';
import MyProfileQry from 'mods/auth/gql/MyProfileQry';

/* eslint-disable react/jsx-props-no-spreading,react/prop-types */
function App({ Component, pageProps }) {
  const { authStore } = useStores();

  const apolloClient = useApollo(pageProps.initialApolloState);

  useEffect(() => {
    const getAuthData = async () => {
      try {
        const profileRes = await apolloClient.query({ query: MyProfileQry });
        const { myProfile } = profileRes.data;
        authStore.setMyProfile(myProfile);
      } catch (error) {
        // do nothing
      }
    };
    getAuthData();
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <Helmet
        titleTemplate="Tech Hustlers | %s"
        defaultTitle="Tech Hustlers | Launch your apps here"
      />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default App;
