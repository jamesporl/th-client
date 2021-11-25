import React from 'react';
import { observer } from 'mobx-react';
import useStores from 'core/stores/useStores';
import styled from 'styled-components';
import modalComponents from 'core/utils/globalModal/modalComponents';

const Wrapper = styled.div`
  .not-found {
    margin: 40px 0;
    text-align: center;
  }
`;

const ModalContent = () => {
  const { uiStore } = useStores();
  const modalComponent = modalComponents[uiStore.globalModalParams.componentKey];

  if (!modalComponent) {
    return (
      <Wrapper>
        <div className="not-found">
          <h3>Content not found.</h3>
        </div>
      </Wrapper>
    );
  }

  const modalContent = React.createElement(modalComponent);

  return <Wrapper>{modalContent}</Wrapper>;
};

export default observer(ModalContent);
