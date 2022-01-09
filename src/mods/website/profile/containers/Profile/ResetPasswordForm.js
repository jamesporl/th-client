import React from 'react';
import { Button, Grid, GridItem, useToast } from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import PasswordFormControl from 'mods/auth/components/PasswordFormControl';
import ResetPasswordWithAuthMtn from '../../gql/ResetPasswordWithAuthMtn';

const ResetPassowrdSchema = yup.object().shape({
  password: yup.string().max(50, 'Too long').required('Password is required'),
});

const ResetPasswordForm = () => {
  const [resetPasswordWithAuth] = useMutation(ResetPasswordWithAuthMtn);
  const toast = useToast();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const { password } = values;
    const input = { newPassword: password };
    try {
      await resetPasswordWithAuth({ variables: { input } });
      toast({
        position: 'top',
        status: 'success',
        variant: 'subtle',
        description: 'Your password has been successfully changed.',
      });
      resetForm();
    } catch (error) {
      toast({ position: 'top', status: 'error', variant: 'subtle', description: error.message });
    }
    setSubmitting(false);
  };

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={2}>
      <GridItem colStart={2} colEnd={4}>
        <Formik
          validationSchema={ResetPassowrdSchema}
          onSubmit={handleSubmit}
          initialValues={{ password: '', confirmPassword: '' }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Field name="password">
                {({ field }) => (
                  <PasswordFormControl
                    field={field}
                    touched={touched.password}
                    error={errors.password}
                    label="New password"
                    placeholder="Enter new password"
                  />
                )}
              </Field>
              <Button colorScheme="blue" size="md" type="submit" mt={4} isLoading={isSubmitting}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </GridItem>
    </Grid>
  );
};

export default ResetPasswordForm;
