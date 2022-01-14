import React, { useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { Button, useToast, Alert, AlertIcon, AlertDescription, Flex, Link } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { Helmet } from 'react-helmet';
import AuthPageContainer from '../components/AuthPageContainer';
import PasswordFormControl from '../components/PasswordFormControl';
import ResetPasswordByTokenMtn from '../gql/ResetPasswordByTokenMtn';

const ResetPasswordSchema = yup.object().shape({
  password: yup.string().max(50, 'Too long').required('Password is required'),
});

const ResetPassword = () => {
  const toast = useToast();

  const router = useRouter();
  const { email, token } = router.query;

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [resetPasswordByToken] = useMutation(ResetPasswordByTokenMtn);

  const handleSubmit = useCallback(
    async (values, { setSubmitting }) => {
      const { password } = values;
      const input = { newPassword: password, email, token };
      try {
        await resetPasswordByToken({ variables: { input } });
        setHasSubmitted(true);
      } catch (error) {
        toast({ position: 'top', status: 'error', variant: 'subtle', description: error.message });
      }
      setSubmitting(false);
    },
    [email, token],
  );

  let content = (
    <Formik
      validationSchema={ResetPasswordSchema}
      onSubmit={handleSubmit}
      initialValues={{ email: '', password: '' }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <Field name="password">
            {({ field }) => (
              <PasswordFormControl
                placeholder="Enter new password"
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
            isLoading={isSubmitting}
            mt={8}
          >
            Reset Password
          </Button>
        </Form>
      )}
    </Formik>
  );

  if (hasSubmitted) {
    content = (
      <>
        <Alert
          status="success"
          mt={8}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <AlertIcon boxSize="24px" />
          <AlertDescription maxWidth="md" mt={4}>
            Your password has been successfully reset.
          </AlertDescription>
        </Alert>
        <Flex mt={8} justifyContent="center">
          <NextLink href="/account/login" passHref>
            <Link style={{ textDecoration: 'none' }}>Back To Login</Link>
          </NextLink>
        </Flex>
      </>
    );
  }

  return (
    <AuthPageContainer>
      <Helmet title="Reset Password" />
      {content}
    </AuthPageContainer>
  );
};

export default ResetPassword;
