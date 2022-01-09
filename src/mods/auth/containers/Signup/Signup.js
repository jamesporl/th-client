import React from 'react';
import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import Link from 'next/link';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import * as yup from 'yup';
import useStores from 'core/stores/useStores';
import SignupMtn from '../../gql/SignupMtn';
import PasswordFormControl from '../../components/PasswordFormControl';
import AuthPageContainer from '../../components/AuthPageContainer';

const Wrapper = styled.div`
  .terms {
    margin: 1rem 0;
    text-align: center;

    a {
      margin-left: 2px;
    }
  }
`;

const SignupSchema = yup.object().shape({
  firstName: yup.string().max(50, 'Too long').required('First name is required'),
  lastName: yup.string().max(50, 'Too long').required('Last name is required'),
  email: yup.string().max(50, 'Too long').required('E-mail is required').email('Invalid e-mail'),
  password: yup.string().max(50, 'Too long').required('Password is required'),
});

const Signup = () => {
  const { authStore } = useStores();
  const toast = useToast();

  const [signup] = useMutation(SignupMtn);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { data } = await signup({ variables: { input: values } });
      const authToken = data.signup;
      authStore.login(authToken);
      window.location.href = '/';
    } catch (error) {
      toast({ position: 'top', status: 'error', variant: 'subtle', description: error.message });
    }
    setSubmitting(false);
  };

  const initialValues = { email: '', password: '', firstName: '', lastName: '' };

  return (
    <AuthPageContainer>
      <Helmet title="Sign-up" />
      <Wrapper>
        <Formik
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
          initialValues={initialValues}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <SimpleGrid columns={2} spacing={4}>
                <Box>
                  <Field name="firstName">
                    {({ field }) => (
                      <FormControl isInvalid={errors.firstName && touched.firstName}>
                        <FormLabel htmlFor="firstName">First name</FormLabel>
                        <Input {...field} id="firstName" />
                        <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Box>
                <Box>
                  <Field name="lastName">
                    {({ field }) => (
                      <FormControl isInvalid={errors.lastName && touched.lastName}>
                        <FormLabel htmlFor="lastName">Last name</FormLabel>
                        <Input {...field} id="lastName" />
                        <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Box>
              </SimpleGrid>
              <Field name="email">
                {({ field }) => (
                  <FormControl isInvalid={errors.email && touched.email} mt={8}>
                    <FormLabel htmlFor="email">E-mail</FormLabel>
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
                Sign up
              </Button>
              <div className="terms">
                <small>
                  By continuing, you agree to our
                  <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">
                    Terms and Conditions.
                  </a>
                </small>
              </div>
              <div style={{ marginTop: '1.5rem', fontStyle: 'italic', color: '#0D2175' }}>
                Already have an account? &nbsp;
                <Link href="/account/login" as="/account/login" passHref>
                  <a>Log in here.</a>
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </AuthPageContainer>
  );
};

export default Signup;
