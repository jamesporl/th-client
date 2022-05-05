import React, { useCallback } from 'react';
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
import UpdatePersonalInfoMtn from '../../gql/UpdatePersonalInfoMtn';

const PersonalInfoSchema = yup.object().shape({
  firstName: yup.string().max(50, 'Too long').required('First name is required'),
  lastName: yup.string().max(50, 'Too long').required('Last name is required'),
  shortDesc: yup.string().max(250, 'Too long').notRequired(),
});

const Wrapper = styled.div``;

const PersonalInfoForm = ({ myProfile, onRefetch }) => {
  const [updatePersonalInfo] = useMutation(UpdatePersonalInfoMtn);
  const toast = useToast();

  const computeIfSubmitIsDisabled = useCallback(
    (values) =>
      values?.firstName === myProfile?.firstName &&
      values?.lastName === myProfile?.lastName &&
      (values?.shortDesc || '') === (myProfile?.shortDesc || ''),
    [myProfile],
  );

  const handleSubmit = async (values, { setSubmitting }) => {
    const { firstName, lastName, shortDesc } = values;
    const input = { firstName, lastName, shortDesc };
    try {
      await updatePersonalInfo({ variables: { input } });
      toast({
        position: 'top',
        status: 'success',
        variant: 'subtle',
        description: 'Your profile has been successfully updated.',
      });
      onRefetch();
    } catch (error) {
      toast({ position: 'top', status: 'error', variant: 'subtle', description: error.message });
    }
    setSubmitting(false);
  };

  const initialVals = {
    firstName: myProfile.firstName,
    lastName: myProfile.lastName,
    shortDesc: myProfile.shortDesc || '',
  };

  return (
    <Wrapper>
      <Formik
        validationSchema={PersonalInfoSchema}
        onSubmit={handleSubmit}
        initialValues={initialVals}
        enableReinitialize
      >
        {({ errors, touched, isSubmitting, values }) => (
          <Form>
            <Grid templateColumns="repeat(2, 1fr)" gap={2}>
              <GridItem>
                <Field name="firstName">
                  {({ field }) => (
                    <FormControl isInvalid={errors.firstName && touched.firstName}>
                      <FormLabel htmlFor="firstName">First name</FormLabel>
                      <Input {...field} id="firstName" />
                      <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </GridItem>
              <GridItem>
                <Field name="lastName">
                  {({ field }) => (
                    <FormControl isInvalid={errors.lastName && touched.lastName}>
                      <FormLabel htmlFor="lastName">Last name</FormLabel>
                      <Input {...field} id="lastName" />
                      <FormErrorMessage>{errors.last}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </GridItem>
              <GridItem colSpan={2}>
                <Field name="shortDesc">
                  {({ field }) => (
                    <FormControl isInvalid={errors.shortDesc && touched.shortDesc}>
                      <FormLabel htmlFor="shortDesc">Short Description</FormLabel>
                      <Input {...field} id="shortDesc" placeholder="Write a tagline for yourself" />
                      <FormErrorMessage>{errors.shortDesc}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </GridItem>
            </Grid>
            <Button
              colorScheme="blue"
              size="md"
              type="submit"
              mt={4}
              isLoading={isSubmitting}
              disabled={computeIfSubmitIsDisabled(values)}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

PersonalInfoForm.propTypes = {
  myProfile: PropTypes.object.isRequired,
  onRefetch: PropTypes.func.isRequired,
};

export default PersonalInfoForm;
