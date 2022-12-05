import React, { useEffect, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { Helmet } from 'react-helmet';
import { ChakraProvider } from '@chakra-ui/react';
import { useApollo } from 'core/apollo/createApolloClient';
import useStores from 'core/stores/useStores';
import MyProfileQry from 'mods/auth/gql/MyProfileQry';
import chakraCustomTheme from 'utils/styles/chakraCustomTheme';

/* eslint-disable react/jsx-props-no-spreading,react/prop-types */
function App({ Component, pageProps }) {
  const { authStore, uiStore } = useStores();
  const [isGAScriptReady, setIsGAScriptReady] = useState(false);
  const router = useRouter();

  const apolloClient = useApollo(pageProps.initialApolloState);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      isGAScriptReady &&
      !router.asPath?.startsWith('/my') &&
      !router.asPath?.startsWith('/site-admin')
    ) {
      window.gtag('config', `${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`, {
        page_path: router.asPath,
      });
    }
  }, [router.asPath, isGAScriptReady]);

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

  let gaScript = null;
  if (!router.pathname?.startsWith('/my') && !router.pathname?.startsWith('/site-admin')) {
    gaScript = (
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
        onReady={() => setIsGAScriptReady(true)}
      />
    );
  }

  return (
    <>
      <ApolloProvider client={apolloClient}>
        <ChakraProvider theme={chakraCustomTheme}>
          <Helmet
            titleTemplate="%s - TechHustlers PH"
            defaultTitle="TechHustlers PH - Local Tech Products in One Place"
          />
          <Component {...pageProps} />
        </ChakraProvider>
      </ApolloProvider>
      {gaScript}
    </>
  );
}

export default App;
