import React from 'react';
import { useMutation } from '@apollo/client';
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  useToast,
  VStack,
  Flex,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import NextLink from 'next/link';
import styled from 'styled-components';
import Head from 'next/head';
import useStores from 'core/stores/useStores';
import LoginMtn from 'mods/auth/gql/LoginMtn';
import getPageTitle from 'core/utils/getPageTitle';
import PasswordFormControl from '../../components/PasswordFormControl';
import GoogleLoginButton from '../../components/GoogleLoginButton';
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

const LoginSchema = yup.object().shape({
  email: yup.string().max(50, 'Too long').required('E-mail is required').email('Invalid e-mail'),
  password: yup.string().max(50, 'Too long').required('Password is required'),
});

const Login = () => {
  const { authStore } = useStores();
  const toast = useToast();

  const [login] = useMutation(LoginMtn);

  const handleSubmit = async (values, { setSubmitting }) => {
    const { email, password } = values;
    const input = {
      email,
      password,
    };
    try {
      const { data } = await login({ variables: { input } });
      const authToken = data.login;
      if (authToken) {
        authStore.login(authToken);
        window.location.href = '/';
      } else {
        const encodedEMail = encodeURIComponent(email);
        window.location.href = `/account/email-verification?email=${encodedEMail}`;
      }
    } catch (error) {
      toast({ position: 'top', status: 'error', variant: 'subtle', description: error.message });
    }
    setSubmitting(false);
  };

  return (
    <AuthPageContainer>
      <Head>
        <title>{getPageTitle('Login')}</title>
      </Head>
      <Wrapper>
        <Formik
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
          initialValues={{ email: '', password: '' }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Field name="email">
                {({ field }) => (
                  <FormControl isInvalid={errors.email && touched.email}>
                    <FormLabel htmlFor="email">E-mail address</FormLabel>
                    <Input {...field} id="email" type="email" />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {({ field }) => (
                  <PasswordFormControl
                    field={field}
                    touched={touched.password}
                    error={errors.password}
                  />
                )}
              </Field>
              <VStack spacing={4} mt={8}>
                <Button
                  colorScheme="blue"
                  width="100%"
                  size="md"
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Log in
                </Button>
                <GoogleLoginButton />
              </VStack>
              <div className="terms">
                <small>
                  By continuing, you agree to our
                  <a href="/site/terms-and-conditions" target="_blank" rel="noopener noreferrer">
                    Terms and Conditions.
                  </a>
                </small>
              </div>
              <Flex mt={8} justifyContent="center">
                <NextLink href="/account/forgot-password">Forgot password?</NextLink>
              </Flex>
              <div style={{ marginTop: '1.5rem', fontStyle: 'italic', color: '#0D2175' }}>
                <small>
                  Don&apos;t have an account? &nbsp;
                  <NextLink href="/account/signup" as="/account/signup">
                    Sign up here.
                  </NextLink>
                </small>
              </div>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </AuthPageContainer>
  );
};

export default Login;
