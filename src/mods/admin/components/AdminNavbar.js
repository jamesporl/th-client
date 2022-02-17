import React from 'react';
import {
  Avatar,
  Flex,
  Menu,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuButton,
  Button,
} from '@chakra-ui/react';
import { LogoutOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useStores from 'core/stores/useStores';

const Wrapper = styled.div`
  .header {
    border-bottom: 1px solid #efefef;
    background-color: #fff;
    z-index: 1000;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

    .nav-container {
      width: 100%;
    }
  }
`;

const AdminNavbar = ({ onToggleSidebarOpen }) => {
  const { authStore } = useStores();
  const router = useRouter();

  const handleClickLogout = () => {
    authStore.logout();
    window.location.href = '/';
  };

  const handleClickMyProfile = () => {
    router.push('/my/profile');
  };

  let profileAvatar = null;

  if (authStore.myProfile) {
    const menu = (
      <MenuList>
        <MenuItem key="1" icon={<UserOutlined />} onClick={handleClickMyProfile}>
          My Profile
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
          <Avatar
            name={authStore.myProfile?.firstName}
            size="sm"
            src={authStore.myProfile?.image?.thumbnail}
          />
        </MenuButton>
        {menu}
      </Menu>
    );
  }

  return (
    <Wrapper>
      <Flex
        as="header"
        w="100%"
        justifyContent="center"
        alignItems="center"
        h="60px"
        pl={4}
        pr={4}
        className="header"
      >
        <Flex alignItems="center" justifyContent="space-between" className="nav-container">
          <Button
            colorScheme="alphaBlack"
            variant="link"
            size="sm"
            onClick={onToggleSidebarOpen}
            style={{ textDecoration: 'none' }}
          >
            <MenuOutlined style={{ fontSize: 16 }} />
          </Button>
          <Flex alignItems="center" justifyContent="flex-end" ml={8}>
            {profileAvatar}
          </Flex>
        </Flex>
      </Flex>
    </Wrapper>
  );
};

AdminNavbar.propTypes = {
  onToggleSidebarOpen: PropTypes.func.isRequired,
};

export default observer(AdminNavbar);
