import React from 'react';
import { Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  background-color: #fff;
  padding: 0 1rem;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #ccc;
`;

const PageHeader = ({ title }) => (
  <Wrapper>
    <Text fontWeight="bold" fontSize="lg">
      {title}
    </Text>
  </Wrapper>
);

PageHeader.propTypes = {
  title: PropTypes.func.isRequired,
};

PageHeader.defaultProps = {};

export default PageHeader;
