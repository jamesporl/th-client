import React from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet';
import WebsiteLayout from 'mods/website/components/WebsiteLayout';
import AppDetails from 'mods/website/components/AppDetails';
import AppQry from '../../gql/AppQry';

const App = () => {
  const router = useRouter();

  const { slug } = router.query;

  const { data } = useQuery(AppQry, { variables: { slug }, skip: !slug });

  let appDetails = null;
  let title = '...';
  if (data) {
    appDetails = <AppDetails app={data.app} isPreview={false} />;
    title = data.app.name;
  }

  return (
    <WebsiteLayout>
      <Helmet title={title} />
      {appDetails}
    </WebsiteLayout>
  );
};

export default App;
