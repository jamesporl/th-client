import React from 'react';
import { useMutation } from '@apollo/client';
import { message, Form, Input, Button } from 'antd';
import Link from 'next/link';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import useStores from 'core/stores/useStores';
import LoginMtn from 'mods/auth/gql/LoginMtn';
import AuthPageContainer from '../../components/AuthPageContainer';

const Wrapper = styled.div`
  .terms {
    margin: 1rem 0;
    text-align: center;

    a {
      margin-left: 2px;
    }
  }

  .forgot-password {
    margin: 0.5rem 0;
    text-align: center;
  }
`;

const LoginPage = () => {
  const [loginForm] = Form.useForm();
  const { authStore } = useStores();

  const [login] = useMutation(LoginMtn);

  const onFinish = async (values) => {
    const { email, password } = values;
    const input = {
      email,
      password,
    };
    try {
      const { data } = await login({ variables: { input } });
      const authToken = data.login;
      authStore.login(authToken);
      window.location.href = '/';
    } catch (error) {
      message.error(error.message.replace('GraphQL error :', ''));
    }
  };

  const emailRules = [{ required: true, message: 'E-mail is required.' }];
  const pwRules = [{ required: true, message: 'Password is required.' }];

  return (
    <AuthPageContainer>
      <Helmet title="Login | Tech Hustlers" />
      <Wrapper>
        <Form form={loginForm} onFinish={onFinish} layout="vertical" hideRequiredMark>
          <Form.Item name="email" label="E-mail address" rules={emailRules}>
            <Input />
          </Form.Item>
          <Form.Item name="password" rules={pwRules} label="Password">
            <Input.Password />
          </Form.Item>
          <div style={{ marginTop: '10px' }} />
          <Button type="primary" block htmlType="submit" className="auth-btn">
            Log in
          </Button>
        </Form>
        <div className="terms">
          <small>
            By continuing, you agree to our
            <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">
              Terms and Conditions.
            </a>
          </small>
        </div>
        <div className="forgot-password">
          <Link href="/account/forgot-password" as="/account/forgot-password" passHref>
            <a>Forgot password?</a>
          </Link>
        </div>
        <div style={{ marginTop: '1.5rem', fontStyle: 'italic', color: '#0D2175' }}>
          Don&apos;t have an account? &nbsp;
          <Link href="/account/signup" as="/account/signup" passHref>
            <a>Sign up here.</a>
          </Link>
        </div>
      </Wrapper>
    </AuthPageContainer>
  );
};

export default LoginPage;
