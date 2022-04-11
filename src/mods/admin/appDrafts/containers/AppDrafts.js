import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { Avatar, Flex, Text, Menu, MenuList, MenuItem, MenuButton, HStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import PageHeader from 'mods/admin/components/PageHeader';
import AppDraftStatusTag from 'mods/website/profile/components/AppDraftStatusTag';
import FormattedDate from 'mods/base/components/FormattedDate';
import { LIST_PAGE_SIZE } from 'mods/admin/constants';
import SearchFilterSortButton from 'mods/admin/components/SearchFilterSortButton';
import AdminLayout from '../../components/AdminLayout';
import Table from '../../components/Table';
import AAppDraftsQry from '../gql/AAppDraftsQry';

const AppDrafts = () => {
  const router = useRouter();

  const { data, refetch } = useQuery(AAppDraftsQry, {
    variables: { pageSize: LIST_PAGE_SIZE, page: 1 },
  });
  const { nodes: dataSource, totalCount = 0 } = data?.aAppDrafts || {};

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
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      render: (createdAt) => <FormattedDate date={createdAt} format="dateTime" />,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status) => <AppDraftStatusTag appDraftStatus={status} />,
    },
    {
      title: 'Actions',
      dataIndex: 'appId',
      key: 'actions',
      align: 'center',
      render: (appId) => {
        const menu = (
          <MenuList>
            <MenuItem key="1" onClick={() => router.push(`/site-admin/app-drafts/${appId}`)}>
              View Draft
            </MenuItem>
          </MenuList>
        );

        return (
          <Menu placement="bottom-end" size="lg">
            <MenuButton>
              <a>
                Actions <DownOutlined />
              </a>
            </MenuButton>
            {menu}
          </Menu>
        );
      },
    },
  ];

  const breadcrumbs = [
    {
      title: 'Drafts',
      href: '/site-admin/app-drafts',
    },
  ];

  const pagination = {
    totalCount,
    pageSize: LIST_PAGE_SIZE,
    onChangePage: (newPage) => {
      refetch({ page: newPage });
    },
  };

  const actions = (
    <HStack>
      <SearchFilterSortButton searchCompKey="appDrafts" />
    </HStack>
  );

  return (
    <AdminLayout title="Drafts">
      <PageHeader
        title="Drafts"
        breadcrumbs={breadcrumbs}
        pagination={pagination}
        actions={actions}
      />
      <div style={{ position: 'relative' }}>
        <Table data={dataSource} columns={columns} />
      </div>
    </AdminLayout>
  );
};

export default AppDrafts;
