import React from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import WebsiteLayout from 'mods/website/components/WebsiteLayout';
import AppDetails from 'mods/website/components/AppDetails';
import AppQry from '../../gql/AppQry';

const App = () => {
  const router = useRouter();

  const { slug } = router.query;

  const { data } = useQuery(AppQry, { variables: { slug } });

  let appDetails = null;
  if (data) {
    appDetails = <AppDetails app={data.app} />;
  }
  return <WebsiteLayout>{appDetails}</WebsiteLayout>;
};

export default App;
