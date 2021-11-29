import React, { useEffect } from 'react';
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import useStores from 'core/stores/useStores';
import GlobalModalContent from 'mods/base/components/GlobalModalContent';
import WebsiteNavbar from './WebsiteNavbar';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;

  .container {
    display: flex;
    width: 100%;
    max-width: 1100px;
    justify-content: space-between;
    padding: 3rem 0;

    @media (max-width: 1100px) {
      padding: 3rem 2rem;
    }

    @media (max-width: 767px) {
      padding: 3rem 1rem;
    }

    .child-container {
      flex-grow: 1;
      margin-top: 6rem;
    }
  }
`;

const WebsiteLayout = ({ children }) => {
  const { uiStore } = useStores();

  useEffect(() => {
    const handleResize = () => uiStore.setScreenSize(window.innerWidth, window.innerHeight);
    // trigger resize on mount, and listen to resize event afterwards
    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  return (
    <>
      <WebsiteNavbar />
      <Wrapper>
        <div className="container">
          <div className="child-container">{children}</div>
        </div>
      </Wrapper>
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

WebsiteLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default observer(WebsiteLayout);
