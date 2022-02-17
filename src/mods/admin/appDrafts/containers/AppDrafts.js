import React from 'react';
import { useQuery } from '@apollo/client';
import { Avatar, Flex, Text } from '@chakra-ui/react';
import PageHeader from 'mods/admin/components/PageHeader';
import AppDraftStatusTag from 'mods/website/profile/components/AppDraftStatusTag';
import AdminLayout from '../../components/AdminLayout';
import Table from '../../components/Table';
import AAppDraftsQry from '../gql/AAppDraftsQry';

const AppDrafts = () => {
  const { data } = useQuery(AAppDraftsQry);
  const { nodes: dataSource } = data?.aAppDrafts || {};

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: 'left',
      render: (_, doc) => {
        let src = doc.logoImg?.thumbnail;
        if (!src) {
          src = '/img-sq-placeholder.png';
        }
        return (
          <Flex>
            <img src={src} alt="logo" width="50px" style={{ borderRadius: '0.25rem' }} />
            <Flex flexDirection="column" ml={2}>
              <Text fontWeight="bold">{doc.name}</Text>
              <Text fontSize="sm">{doc.shortDesc}</Text>
            </Flex>
          </Flex>
        );
      },
    },
    {
      title: 'Creator',
      dataIndex: 'ownedBy',
      key: 'ownedBy',
      align: 'left',
      render: (_, doc) => (
        <Flex>
          <Avatar name={doc.ownedBy?.firstName} size="sm" src={doc.ownedBy?.image?.thumbnail} />
          &nbsp; <Text>{`${doc.ownedBy?.firstName} ${doc.ownedBy?.lastName}`}</Text>
        </Flex>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status) => <AppDraftStatusTag appDraftStatus={status} />,
    },
  ];
  return (
    <AdminLayout>
      <PageHeader title="Drafts" />
      <Table data={dataSource} columns={columns} />
    </AdminLayout>
  );
};

export default AppDrafts;
