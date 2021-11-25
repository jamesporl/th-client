import React from 'react';
import Link from 'next/link';
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

  .login-logo {
    text-align: center;
    margin-bottom: 2rem;
    img {
      height: 2rem;
    }
  }

  .form-box {
    position: absolute;
    top: 40%;
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
      <div className="login-logo">
        <Link href="/" as="/" passHref>
          <a>
            <img src="/logo.png" alt="logo" />
          </a>
        </Link>
      </div>
      {children}
    </div>
  </Wrapper>
);

AuthPageContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthPageContainer;
