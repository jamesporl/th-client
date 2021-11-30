import React from 'react';
import {
  Avatar,
  Flex,
  Button,
  Menu,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuButton,
  HStack,
} from '@chakra-ui/react';
import { AppstoreOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useApolloClient } from '@apollo/client';
import { observer } from 'mobx-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import useStores from 'core/stores/useStores';
import MyAppDraftsQry from 'mods/website/profile/gql/MyAppDraftsQry';

const Wrapper = styled.div`
  .header {
    border-bottom: 1px solid #efefef;
    background-color: #fff;
    z-index: 1000;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }

  .container {
    width: 100%;
    max-width: 1100px;
  }
`;

const WebsiteNavbar = () => {
  const { authStore, uiStore } = useStores();
  const router = useRouter();
  const apolloClient = useApolloClient();

  const handleClickLogout = () => {
    authStore.logout();
    window.location.href = '/';
  };

  const handleClickMyApps = () => {
    router.push('/my/apps');
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
      uiStore.openGlobalModal('newAppForm', 'New App');
    } else {
      window.location.href = '/account/login';
    }
  };

  let profileAvatar = null;

  if (authStore.myProfile) {
    const menu = (
      <MenuList>
        <MenuItem key="1" icon={<UserOutlined />}>
          My Account
        </MenuItem>
        <MenuItem key="2" icon={<AppstoreOutlined />} onClick={handleClickMyApps}>
          My Apps
        </MenuItem>
        <MenuDivider />
        <MenuItem key="logout" icon={<LogoutOutlined />} onClick={handleClickLogout}>
          Log out
        </MenuItem>
      </MenuList>
    );

    profileAvatar = (
      <Menu placement="bottom-end" size="lg">
        <MenuButton>
          <Avatar name={authStore.myProfile?.firstName} size="sm" />
        </MenuButton>
        {menu}
      </Menu>
    );
  }
  return (
    <Wrapper>
      <Flex
        as="header"
        position="fixed"
        w="100%"
        justifyContent="center"
        alignItems="center"
        h="80px"
        className="header"
      >
        <Flex alignItems="center" justifyContent="space-between" className="container">
          <Flex alignItems="center">
            <Link href="/" as="/" passHref>
              <a>
                <img src="/logo.png" alt="logo" width="280px" />
              </a>
            </Link>
          </Flex>
          <Flex alignItems="center" justifyContent="flex-end">
            <HStack spacing="1rem">
              <Button colorScheme="green" size="md" onClick={handleClickNewApp}>
                Submit an App
              </Button>
              {profileAvatar}
            </HStack>
          </Flex>
        </Flex>
      </Flex>
    </Wrapper>
  );
};

export default observer(WebsiteNavbar);
