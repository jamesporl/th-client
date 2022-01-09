import React from 'react';
import Link from 'next/link';
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
    background: url('/auth-bg.jpeg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100vw;
    height: 100vh;
    filter: brightness(50%);
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
        <Link href="/" as="/" passHref>
          <a>
            <img src="/logo-full.png" alt="logo" width="280px" />
          </a>
        </Link>
      </Flex>
      <Box mt={8}>{children}</Box>
    </div>
  </Wrapper>
);

AuthPageContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthPageContainer;
