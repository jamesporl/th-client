import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Spinner = ({ text }) => {
  const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  return (
    <Wrapper>
      <Spin indicator={loadingIcon} />
      <p>{text}</p>
    </Wrapper>
  );
};

Spinner.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Spinner;
