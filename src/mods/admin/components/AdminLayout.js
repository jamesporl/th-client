import React from 'react';
import { Box, Modal, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import useStores from 'core/stores/useStores';
import GlobalModalContent from 'mods/base/components/GlobalModalContent';
import { Helmet } from 'react-helmet';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';
import SearchDrawer from './SearchDrawer';

const Wrapper = styled.div`
  display: flex;
  height: ${(props) => props.screenheight}px;

  .content {
    background-color: #f6f6f6;
    height: ${(props) => props.screenheight - 60}px;

    .with-header-overflow {
      height: ${(props) => props.screenheight - 120}px;
      overflow-y: auto;
    }
  }
`;

const AdminLayout = ({ children, title }) => {
  const { uiStore } = useStores();
  const { isOpen: isSidebarOpen, onToggle: onToggleSidebarOpen } = useDisclosure({
    defaultIsOpen: true,
  });

  let titleComp = null;
  if (title) {
    titleComp = <Helmet title={title} />;
  }

  return (
    <>
      {titleComp}
      <Wrapper screenheight={uiStore.screenheight} width="100%">
        <AdminSidebar className="side-bar" isCollapsed={!isSidebarOpen} />
        <Box flexGrow="1" height={`${uiStore.screenheight}px`} overflowY="hidden">
          <AdminNavbar onToggleSidebarOpen={onToggleSidebarOpen} />
          <div className="content">{children}</div>
        </Box>
      </Wrapper>
      <SearchDrawer />
      <Modal
        isOpen={uiStore.isGlobalModalOpen}
        onClose={uiStore.closeGlobalModal}
        size="lg"
        {...uiStore.globalModalParams.props}
      >
        <ModalOverlay />
        <ModalContent>
          <GlobalModalContent />
        </ModalContent>
      </Modal>
    </>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

AdminLayout.defaultProps = {
  title: '',
};

export default observer(AdminLayout);
