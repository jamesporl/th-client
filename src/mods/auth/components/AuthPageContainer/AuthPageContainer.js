import React from 'react';
import NextLink from 'next/link';
import { Box, Flex } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  :before {
    display: block;
    content: '';
    position: relative;
    top: 0;
    left: 0;
    background: rgb(26, 111, 191);
    background: linear-gradient(
      56deg,
      rgba(26, 111, 191, 1) 34%,
      rgba(76, 147, 214, 1) 68%,
      rgba(49, 130, 206, 1) 100%
    );
    width: 100vw;
    height: 100vh;
  }

  .form-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 10px;
    border-radius: 7.5px;
    background-color: #fff;
    overflow: hidden;
    margin-left: auto;
    margin-right: auto;
    width: 400px;
    padding: 3rem 2rem;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    background: #fff;
  }

  .auth-btn {
    font-weight: 700;
  }
`;

const AuthPageContainer = ({ children }) => (
  <Wrapper>
    <div className="form-box">
      <Flex w="100%" justifyContent="center">
        <NextLink href="/" as="/" passHref>
          <img src="/logo-full.png" alt="logo" width="280px" />
        </NextLink>
      </Flex>
      <Box mt={8}>{children}</Box>
    </div>
  </Wrapper>
);

AuthPageContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthPageContainer;
