import React, { useEffect, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import { useApollo } from 'core/apollo/createApolloClient';
import useStores from 'core/stores/useStores';
import MyProfileQry from 'mods/auth/gql/MyProfileQry';
import chakraCustomTheme from 'utils/styles/chakraCustomTheme';
import getPageTitle from 'core/utils/getPageTitle';

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

  const favicons = [
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/favicons/apple-touch-icon.png?v=6',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicons/favicon-32x32.png?v=6',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicons/favicon-16x16.png?v=6',
    },
    {
      rel: 'manifest',
      href: '/favicons/site.webmanifest',
    },
  ];

  const meta = [
    {
      name: 'google-site-verification',
      content: '7nKci5fUuvO3y_QAL_qoCAb1MPxstt6GrpreLBOuThI',
    },
  ];

  return (
    <>
      <Head>
        <title>{getPageTitle()}</title>
        {meta.map((tag, index) => (
          <meta key={index} {...tag} /> // eslint-disable-line react/no-array-index-key
        ))}
        {favicons.map((link, index) => (
          <link key={index} {...link} /> // eslint-disable-line react/no-array-index-key
        ))}
        <meta
          name="viewport"
          key="viewport"
          content="user-scalable=0, initial-scale=1 minimum-scale=1, width=device-width, height=device-height"
        />
      </Head>
      <ApolloProvider client={apolloClient}>
        <ChakraProvider theme={chakraCustomTheme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
