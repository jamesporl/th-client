import React from 'react';
import { BellOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useMutation, useApolloClient } from '@apollo/client';
import { Layout, Button, Space, Avatar, Dropdown, Menu, Form, message } from 'antd';
import { observer } from 'mobx-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import useStores from 'core/stores/useStores';
import MyAppDraftsQry from 'mods/website/profile/gql/MyAppDraftsQry';
import AddAppMtn from '../../apps/gql/AddAppMtn';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;

  .container {
    display: flex;
    width: 100%;
    max-width: 1100px;
    justify-content: space-between;

    .logo {
      img {
        height: 28px;
      }
    }
  }
`;

const WebsiteNavbar = () => {
  const { authStore, uiStore } = useStores();
  const [addAppForm] = Form.useForm();
  const [addApp] = useMutation(AddAppMtn);
  const apolloClient = useApolloClient();
  const router = useRouter();

  const handleClickProfileMenu = (ev) => {
    if (ev.key === 'logout') {
      authStore.logout();
      window.location.href = '/';
    }
  };

  const handleSubmitAddForm = async (values) => {
    const { name, shortDesc } = values;
    const input = { name, shortDesc };
    try {
      const { data } = await addApp({ variables: { input } });
      uiStore.closeGlobalModal();
      router.push(`/my/apps/edit/${data.addApp._id}`);
    } catch (error) {
      message.error(error.message.replace('GraphQL error :', ''));
    }
  };

  const handleClickNewApp = async () => {
    if (authStore.myProfile) {
      const { data } = await apolloClient.query({
        query: MyAppDraftsQry,
        fetchPolicy: 'network-only',
      });
      const appDrafts = data.myAppDrafts.nodes;
      const inProgressDrafts = appDrafts.filter((a) => a.status.key === 'inProgress');
      if (inProgressDrafts.length === 1) {
        router.push(`/my/apps/edit/${appDrafts[0].appId}`);
        return;
      }
      if (appDrafts.length > 0) {
        router.push('/my/apps');
        return;
      }
      uiStore.openGlobalModal(
        'newAppForm',
        'New App',
        { form: addAppForm, onFinish: handleSubmitAddForm },
        { width: 520, onOk: addAppForm.submit },
      );
    } else {
      window.location.href = '/account/login';
    }
  };

  let profileAvatar = null;

  if (authStore.myProfile) {
    const avatarLetter = authStore.myProfile.firstName.charAt(0).toUpperCase();

    const menu = (
      <Menu onClick={handleClickProfileMenu}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          My Account
        </Menu.Item>
        <Menu.Item key="2" icon={<BellOutlined />}>
          Notifications
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout" icon={<LogoutOutlined />}>
          Log out
        </Menu.Item>
      </Menu>
    );

    profileAvatar = (
      <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
        <Avatar shape="round" style={{ backgroundColor: '#184d47', cursor: 'pointer' }}>
          {avatarLetter}
        </Avatar>
      </Dropdown>
    );
  }
  return (
    <Layout.Header
      style={{
        boxShadow: '0 2px 4px -2px rgba(0, 0, 0, 0.2)',
        zIndex: 10,
        position: 'fixed',
        width: '100%',
      }}
    >
      <Wrapper>
        <div className="container">
          <div className="logo">
            <Link href="/" as="/" passHref>
              <a>
                <img src="/logo.png" alt="logo" />
              </a>
            </Link>
          </div>
          <div className="action-buttons">
            <Space size={10}>
              <Button type="primary" onClick={handleClickNewApp}>
                Submit an app
              </Button>
              {profileAvatar}
            </Space>
          </div>
        </div>
      </Wrapper>
    </Layout.Header>
  );
};

export default observer(WebsiteNavbar);
