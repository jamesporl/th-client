import React, { useEffect } from 'react';
import { Layout, Modal } from 'antd';
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
      margin-top: 4rem;
    }
  }
`;

const WrappedModal = styled(Modal)`
  max-height: ${(props) => props.screenheight * 0.9};

  .ant-modal-content {
    max-height: ${(props) => props.screenheight * 0.9};
    overflow-y: auto;
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
      <Layout className="layout">
        <WebsiteNavbar />
        <Layout.Content>
          <Wrapper>
            <div className="container">
              <div className="child-container">{children}</div>
            </div>
          </Wrapper>
        </Layout.Content>
      </Layout>
      <WrappedModal
        visible={uiStore.isGlobalModalOpen}
        okText="Submit"
        onCancel={uiStore.closeGlobalModal}
        centered
        destroyOnClose
        width={900}
        title={uiStore.globalModalParams.title}
        screenheight={uiStore.screenheight}
        {...(uiStore.globalModalParams.props || {})}
      >
        <GlobalModalContent />
      </WrappedModal>
    </>
  );
};

WebsiteLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default observer(WebsiteLayout);
