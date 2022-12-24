import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  useToast,
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import NextLink from 'next/link';
import { Helmet } from 'react-helmet';
import AuthPageContainer from '../components/AuthPageContainer';
import SendPasswordResetLinkMtn from '../gql/SendPasswordResetLinkMtn';

const ForgotPasswordSchema = yup.object().shape({
  email: yup.string().max(50, 'Too long').required('E-mail is required').email('Invalid e-mail'),
});

const ForgotPassword = () => {
  const toast = useToast();

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [sendPasswordResetLink] = useMutation(SendPasswordResetLinkMtn);

  const handleSubmit = async (values, { setSubmitting }) => {
    const { email } = values;
    const input = { email };
    try {
      await sendPasswordResetLink({ variables: { input } });
      setHasSubmitted(true);
    } catch (error) {
      toast({ position: 'top', status: 'error', variant: 'subtle', description: error.message });
    }
    setSubmitting(false);
  };

  let content = (
    <Formik
      validationSchema={ForgotPasswordSchema}
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
          <Button
            colorScheme="blue"
            width="100%"
            size="md"
            type="submit"
            isLoading={isSubmitting}
            mt={8}
          >
            Send Password Reset Link
          </Button>
          <Flex mt={8} justifyContent="center">
            <NextLink href="/account/login">Back To Login</NextLink>
          </Flex>
        </Form>
      )}
    </Formik>
  );

  if (hasSubmitted) {
    content = (
      <Alert
        status="info"
        mt={8}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        <AlertIcon boxSize="24px" />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Kindly check your email.
        </AlertTitle>
        <AlertDescription maxWidth="md" mt={4}>
          If you have entered a valid email, you will receive a password reset link from us.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <AuthPageContainer>
      <Helmet title="Forgot Password" />
      {content}
    </AuthPageContainer>
  );
};

export default ForgotPassword;
