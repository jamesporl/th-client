import React from 'react';
import { useQuery } from '@apollo/client';
import { Avatar } from '@chakra-ui/react';
import PageHeader from 'mods/admin/components/PageHeader';
import AdminLayout from '../../components/AdminLayout';
import Table from '../../components/Table';
import AccountsQry from '../gql/AccountsQry';

const Accounts = () => {
  const { data } = useQuery(AccountsQry);
  const { nodes: dataSource } = data?.accounts || {};

  const columns = [
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'name',
      align: 'left',
      render: (_, doc) => `${doc.firstName} ${doc.lastName}`,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'left',
    },
    {
      title: 'Photo',
      dataIndex: 'image',
      key: 'image',
      align: 'center',
      render: (_, doc) => <Avatar name={doc.firstName} size="sm" src={doc.image?.thumbnail} />,
    },
  ];
  return (
    <AdminLayout>
      <PageHeader title="Accounts" />
      <div className="with-header-overflow">
        <Table data={dataSource} columns={columns} />
      </div>
    </AdminLayout>
  );
};

export default Accounts;
