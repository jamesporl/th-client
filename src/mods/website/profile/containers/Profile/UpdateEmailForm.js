import React from 'react';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
  useToast,
} from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as yup from 'yup';
import UpdateEmailMtn from '../../gql/UpdateEmailMtn';

const UpdatEmailSchema = yup.object().shape({
  email: yup.string().max(50, 'Too long').required('E-mail is required').email('Invalid e-mail'),
});

const Wrapper = styled.div``;

const UpdateEmailForm = ({ email }) => {
  const [updateEmail] = useMutation(UpdateEmailMtn);
  const toast = useToast();

  const handleSubmit = async (values, { setSubmitting }) => {
    const { email: newEmail } = values;
    const input = { newEmail };
    try {
      await updateEmail({ variables: { input } });
      toast({
        position: 'top',
        status: 'success',
        variant: 'subtle',
        description: 'Your email has been successfully changed.',
      });
    } catch (error) {
      toast({ position: 'top', status: 'error', variant: 'subtle', description: error.message });
    }
    setSubmitting(false);
  };

  return (
    <Wrapper>
      <Grid templateColumns="repeat(4, 1fr)" gap={2}>
        <GridItem colStart={2} colEnd={4}>
          <Formik
            validationSchema={UpdatEmailSchema}
            onSubmit={handleSubmit}
            initialValues={{ email }}
            enableReinitialize
          >
            {({ errors, touched, isSubmitting, values }) => (
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
                  size="md"
                  type="submit"
                  mt={4}
                  isLoading={isSubmitting}
                  disabled={values.email === email}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </GridItem>
      </Grid>
    </Wrapper>
  );
};

UpdateEmailForm.propTypes = {
  email: PropTypes.string.isRequired,
};

export default UpdateEmailForm;
