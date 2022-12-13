import React from 'react';
import { useQuery } from '@apollo/client';
import { Button, HStack, Skeleton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import AppDraftQry from 'mods/website/profile/gql/AppDraftQry';
import AppDetails from 'mods/website/components/AppDetails';
import DetailsContainer from '../../components/DetailsContainer';
import PageHeader from '../../components/PageHeader';
import AdminLayout from '../../components/AdminLayout';

const AppDraft = () => {
  const router = useRouter();

  const { _id } = router.query;

  const { data } = useQuery(AppDraftQry, { variables: { _id }, skip: !_id });
  const appDraft = data?.appDraft;
  let previewComp = <Skeleton />;
  let title = '...';
  if (appDraft) {
    previewComp = <AppDetails app={appDraft} isPreview />;
    title = appDraft.name;
  }

  const breadcrumbs = [
    {
      title: 'Drafts',
      href: '/site-admin/app-drafts',
    },
    {
      title,
      href: `/site-admin/app-drafts/${appDraft?.appId}`,
    },
  ];

  const actions = (
    <HStack>
      <Button colorScheme="blue" size="sm" variant="solid">
        Publish
      </Button>
    </HStack>
  );

  return (
    <AdminLayout title={title}>
      <PageHeader title={title} breadcrumbs={breadcrumbs} actions={actions} />
      <div className="with-header-overflow">
        <DetailsContainer>{previewComp}</DetailsContainer>
      </div>
    </AdminLayout>
  );
};

AppDraft.propTypes = {};

AppDraft.defaultProps = {};

export default AppDraft;
