import React from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { Avatar, Skeleton, Typography, List, Button } from 'antd';
import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import WebsiteLayout from 'mods/website/components/WebsiteLayout';
import MyAppDraftsQry from '../gql/MyAppDraftsQry';
import AppDraftStatusTag from '../components/AppDraftStatusTag';

const Wrapper = styled.div`
  .content-container {
    margin-top: 3rem;

    .ant-avatar {
      img {
        border-radius: 0.25rem;
      }
    }
  }
`;

const MyApps = () => {
  const { data, loading } = useQuery(MyAppDraftsQry, { fetchPolicy: 'network-only' });

  const router = useRouter();

  const { nodes: apps } = data?.myAppDrafts || {};

  const handleClickEdit = async (_id) => {
    router.push(`/my/apps/edit/${_id}`);
  };

  const renderApp = (app) => {
    let logoSrc = '/img-sq-placeholder.png';
    if (app.logoImg?.medium) {
      logoSrc = app.logoImg.medium;
    }
    return (
      <List.Item
        extra={<AppDraftStatusTag appDraftStatus={app.status} />}
        actions={[
          <Button type="link" icon={<EditOutlined />} onClick={() => handleClickEdit(app.appId)} />,
          <Button type="link" icon={<DeleteOutlined />} danger />,
        ]}
      >
        <List.Item.Meta
          avatar={<Avatar src={logoSrc} size={80} shape="square" />}
          title={<Typography.Title level={4}>{app.name}</Typography.Title>}
          description={app.shortDesc}
        />
      </List.Item>
    );
  };

  let content = <Skeleton />;
  if (!loading) {
    if (!apps.length) {
      content = (
        <Typography.Text type="secondary">
          Looks like you do not have apps yet. Submit one!
        </Typography.Text>
      );
    } else {
      content = <List bordered itemLayout="horizontal" dataSource={apps} renderItem={renderApp} />;
    }
  }
  return (
    <WebsiteLayout>
      <Helmet title="My Apps" />
      <Wrapper>
        <Typography.Title level={2}>My Apps</Typography.Title>
        <div className="content-container">
          <div className="drafts-container">
            <Typography.Title level={5} type="secondary">
              DRAFTS
            </Typography.Title>
            {content}
          </div>
        </div>
      </Wrapper>
    </WebsiteLayout>
  );
};
export default MyApps;
