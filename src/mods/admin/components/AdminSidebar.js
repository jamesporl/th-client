import React from 'react';
import { AppstoreOutlined, GlobalOutlined, TeamOutlined } from '@ant-design/icons';
import NextLink from 'next/link';
import {
  ProSidebar,
  SidebarHeader,
  SidebarContent,
  Menu,
  MenuItem,
  SubMenu,
} from 'react-pro-sidebar';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import 'react-pro-sidebar/dist/css/styles.css';

const Wrapper = styled.div`
  .pro-sidebar > .pro-sidebar-inner {
    background: #184d47;
    color: #fff;
  }
  .pro-sidebar > .pro-sidebar-inner > .pro-sidebar-layout .pro-sidebar-header {
    border-bottom: 1px solid #fff;
    height: 59px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .pro-sidebar .pro-menu.shaped .pro-menu-item > .pro-inner-item > .pro-icon-wrapper {
    background-color: #184d47;
  }
  .pro-sidebar .pro-menu > ul > .pro-sub-menu > .pro-inner-list-item {
    background-color: #184d47;
  }
  .pro-sidebar.collapsed
    .pro-menu
    > ul
    > .pro-menu-item.pro-sub-menu
    > .pro-inner-list-item
    > .popper-inner {
    background-color: #184d47;
  }
`;

const AdminSidebar = ({ isCollapsed }) => {
  let headerImg = <img src="/logo-full-inv.png" alt="logo" width="200px" />;
  if (isCollapsed) {
    headerImg = <img src="/logo-simple-inv.png" alt="logo" width="40px" />;
  }

  return (
    <Wrapper>
      <ProSidebar collapsed={isCollapsed}>
        <SidebarHeader>{headerImg}</SidebarHeader>
        <SidebarContent>
          <Menu iconShape="square">
            <MenuItem icon={<GlobalOutlined />}>
              <NextLink href="/">Go To Website</NextLink>
            </MenuItem>
            <SubMenu title="Apps" icon={<AppstoreOutlined />}>
              <MenuItem>
                <NextLink href="/site-admin/app-drafts">Drafts</NextLink>
              </MenuItem>
              <MenuItem>
                <NextLink href="/site-admin/apps">Apps</NextLink>
              </MenuItem>
              <MenuItem>
                <NextLink href="/site-admin/app-tags">Tags</NextLink>
              </MenuItem>
            </SubMenu>
            <MenuItem icon={<TeamOutlined />}>
              <NextLink href="/site-admin/accounts">Accounts</NextLink>
            </MenuItem>
          </Menu>
        </SidebarContent>
      </ProSidebar>
    </Wrapper>
  );
};
AdminSidebar.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
};

AdminSidebar.defaultProps = {};

export default AdminSidebar;
