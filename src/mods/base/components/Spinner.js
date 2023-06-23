import React from 'react';
import { Spinner, Text } from '@chakra-ui/react';
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

const THSpinner = ({ text }) => (
  <Wrapper>
    <Spinner size="xl" color="blackAlpha.300" />
    <Text mt={8} color="blackAlpha.600">
      {text}
    </Text>
  </Wrapper>
);

THSpinner.propTypes = {
  text: PropTypes.string.isRequired,
};

export default THSpinner;
