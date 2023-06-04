import React from 'react';
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import Head from 'next/head';
import useStores from 'core/stores/useStores';
import GlobalModalContent from 'mods/base/components/GlobalModalContent';
import getPageTitle from 'core/utils/getPageTitle';
import WebsiteNavbar from './WebsiteNavbar';

const Wrapper = styled.div`
  .container {
    display: flex;
    justify-content: center;
    padding-left: 1rem;
    padding-right: 1rem;

    .child-container {
      width: 100%;
      max-width: 1100px;
      margin-top: 6.5rem;
      margin-bottom: 3rem;
    }
  }
`;

const WebsiteLayout = ({ children }) => {
  const { uiStore } = useStores();

  const baseUrl = `${process.env.NEXT_PUBLIC_TH_CLIENT_BASE_URL}`;

  return (
    <>
      <Wrapper>
        <Head>
          <meta name="og:type" key="og:type" content="website" />
          <meta name="og:title" key="og:title" content={getPageTitle()} />
          <meta name="og:url" key="og:url" content={`${baseUrl}`} />
          <meta
            name="og:image"
            key="og:image"
            content={`${baseUrl}/techhustlers-logo-banner.png`}
          />
          <meta
            name="og:description"
            content="TechHustlers PH is a platform to showcase tech products built by and for Filipinos."
          />
        </Head>
        <WebsiteNavbar />
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
