import React, { useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';
import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet';
import { ChakraProvider } from '@chakra-ui/react';
import { useApollo } from 'core/apollo/createApolloClient';
import useStores from 'core/stores/useStores';
import MyProfileQry from 'mods/auth/gql/MyProfileQry';
import chakraCustomTheme from 'utils/styles/chakraCustomTheme';

/* eslint-disable react/jsx-props-no-spreading,react/prop-types */
function App({ Component, pageProps }) {
  const { authStore, uiStore } = useStores();
  const router = useRouter();

  const apolloClient = useApollo(pageProps.initialApolloState);

  const handleRouteChange = (url) => {
    if (!url.startsWith('/my') && !url.startsWith('/site-admin')) {
      window.gtag('config', `${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`, {
        page_path: url,
      });
    }
  };

  useEffect(() => {
    const handleResize = () => uiStore.setScreenSize(window.innerWidth, window.innerHeight);
    // trigger resize on mount, and listen to resize event afterwards
    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

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
      <ChakraProvider theme={chakraCustomTheme}>
        <Helmet
          titleTemplate="Tech Hustlers | %s"
          defaultTitle="Tech Hustlers | Launch your apps here"
        />
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
