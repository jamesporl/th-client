import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #fff;
  padding: 2rem;
  margin: 1rem;
`;

const DetailsContainer = ({ children }) => <Wrapper>{children}</Wrapper>;

DetailsContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DetailsContainer;
