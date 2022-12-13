import React, { useEffect, useState } from 'react';
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
  const [isGAScriptReady, setIsGAScriptReady] = useState(false);
  const router = useRouter();

  const apolloClient = useApollo(pageProps.initialApolloState);

  const shouldGALoadInUrl = (url) => {
    if (!url) {
      return false;
    }
    return !url.startsWith('/my') && !url.startsWith('/site-admin') && !url.startsWith('/account');
  };

  useEffect(() => {
    const gaScriptId = 'ga-script';
    if (
      typeof window !== 'undefined' &&
      shouldGALoadInUrl(router.asPath) &&
      document.getElementById(gaScriptId) === null
    ) {
      const gaScript = document.createElement('script');
      gaScript.setAttribute(
        'src',
        `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`,
      );
      gaScript.setAttribute('id', gaScriptId);
      document.head.appendChild(gaScript);

      const gaTagScript = document.createElement('script');
      const gaTagInlineScript = document.createTextNode(
        `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}');
       `,
      );
      gaTagScript.appendChild(gaTagInlineScript);
      document.head.appendChild(gaTagScript);

      // now wait for it to load...
      gaScript.onload = () => {
        setIsGAScriptReady(true);
      };
    }
  }, [router.asPath]);

  useEffect(() => {
    if (typeof window !== 'undefined' && isGAScriptReady && shouldGALoadInUrl(router?.asPath)) {
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

  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={chakraCustomTheme}>
        <Helmet
          titleTemplate="%s - TechHustlers PH"
          defaultTitle="TechHustlers PH - Local Tech Products in One Place"
        />
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
