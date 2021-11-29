import React from 'react';
import { useMutation } from '@apollo/client';
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  useToast,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import Link from 'next/link';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import useStores from 'core/stores/useStores';
import LoginMtn from 'mods/auth/gql/LoginMtn';
import PasswordFormControl from 'mods/auth/components/PasswordFormControl';
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
  email: yup.string().max(50, 'Too long').required('E-mail is equired').email('Invalid e-mail'),
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
      authStore.login(authToken);
      window.location.href = '/';
    } catch (error) {
      toast({ position: 'top', status: 'error', variant: 'subtle', description: error.message });
      setSubmitting(false);
    }
  };

  return (
    <AuthPageContainer>
      <Helmet title="Login" />
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
              <Button
                colorScheme="green"
                isFullWidth
                size="md"
                type="submit"
                mt={8}
                isLoading={isSubmitting}
              >
                Log in
              </Button>
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
            </Form>
          )}
        </Formik>
      </Wrapper>
    </AuthPageContainer>
  );
};

export default Login;
