import React from 'react';
import { Button } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import PageHeader from 'mods/admin/components/PageHeader';
import AppTagsQry from 'mods/website/profile/gql/AppTagsQry';
import AdminLayout from '../../components/AdminLayout';
import Table from '../../components/Table';

const Tags = () => {
  const { data } = useQuery(AppTagsQry);

  const { nodes: dataSource } = data?.appTags || {};

  const handleClickAddAppTag = () => {};

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: 'left',
    },
    {
      title: '# of Apps',
      dataIndex: 'appsCount',
      key: 'appsCount',
      align: 'right',
    },
    {
      title: 'Actions',
      dataIndex: '_id',
      key: 'actions',
      align: 'center',
    },
  ];

  const actions = (
    <Button colorScheme="blue" size="sm" onClick={handleClickAddAppTag}>
      New App Tag
    </Button>
  );
  return (
    <AdminLayout>
      <PageHeader title="Tags" actions={actions} />
      <div className="with-header-overflow">
        <Table data={dataSource} columns={columns} />
      </div>
    </AdminLayout>
  );
};

export default Tags;
