import React from 'react';
import {
  Box,
  Grid,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Heading,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import TagSelection from './TagSelection';

const MainDetailsSchema = yup.object().shape({
  name: yup.string().max(50, 'Too long').required('Name of app is required'),
  shortDesc: yup.string().max(80, 'Too long').required('Short description is required'),
  playStoreUrl: yup.string().max(120, 'Too long').url('Invalid URL').nullable(),
  websiteUrl: yup.string().max(120, 'Too long').url('Invalid URL').nullable(),
  appStoreUrl: yup.string().max(120, 'Too long').url('Invalid URL').nullable(),
});

const MainDetails = ({ initialValues, onChange, onChangeTags, onSubmitToServer }) => {
  const handleChangeField = (fieldName, ev, handleChange) => {
    onChange({ [fieldName]: ev.target.value });
    handleChange(ev);
  };

  const handleBlurField = async (ev, handleBlur, validateForm) => {
    handleBlur(ev);
    const errors = await validateForm();
    if (!Object.keys(errors).length) {
      onSubmitToServer();
    }
  };

  return (
    <>
      <Formik enableReinitialize validationSchema={MainDetailsSchema} initialValues={initialValues}>
        {({ errors, touched, handleBlur, handleChange, validateForm }) => (
          <Form>
            <Grid templateColumns="repeat(2, 1fr)" gap={8}>
              <Box>
                <Heading as="h3" size="md">
                  Name and slogan
                </Heading>
                <Field name="name">
                  {({ field }) => (
                    <FormControl isInvalid={errors.name && touched.name} mt={8}>
                      <FormLabel htmlFor="name">Name of app</FormLabel>
                      <Input
                        {...field}
                        id="name"
                        onChange={(ev) => handleChangeField('name', ev, handleChange)}
                        onBlur={(ev) => handleBlurField(ev, handleBlur, validateForm)}
                      />
                      <FormErrorMessage>{errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="shortDesc">
                  {({ field }) => (
                    <FormControl isInvalid={errors.shortDesc && touched.shortDesc} mt={8}>
                      <FormLabel htmlFor="shortDesc">Short description / Slogan</FormLabel>
                      <Input
                        {...field}
                        id="shortDesc"
                        onChange={(ev) => handleChangeField('shortDesc', ev, handleChange)}
                        onBlur={(ev) => handleBlurField(ev, handleBlur, validateForm)}
                      />
                      <FormErrorMessage>{errors.shortDesc}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Box>
              <Box>
                <Heading as="h3" size="md">
                  App links
                </Heading>
                <Field name="websiteUrl">
                  {({ field }) => (
                    <FormControl isInvalid={errors.websiteUrl && touched.websiteUrl} mt={8}>
                      <FormLabel htmlFor="websiteUrl">Website URL</FormLabel>
                      <Input
                        {...field}
                        id="websiteUrl"
                        onChange={(ev) => handleChangeField('websiteUrl', ev, handleChange)}
                        onBlur={(ev) => handleBlurField(ev, handleBlur, validateForm)}
                      />
                      <FormErrorMessage>{errors.websiteUrl}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="appStoreUrl">
                  {({ field }) => (
                    <FormControl isInvalid={errors.appStoreUrl && touched.appStoreUrl} mt={8}>
                      <FormLabel htmlFor="appStoreUrl">App Store URL</FormLabel>
                      <Input
                        {...field}
                        id="appStoreUrl"
                        onChange={(ev) => handleChangeField('appStoreUrl', ev, handleChange)}
                        onBlur={(ev) => handleBlurField(ev, handleBlur, validateForm)}
                      />
                      <FormErrorMessage>{errors.appStoreUrl}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="playStoreUrl">
                  {({ field }) => (
                    <FormControl isInvalid={errors.playStoreUrl && touched.playStoreUrl} mt={8}>
                      <FormLabel htmlFor="playStoreUrl">Play Store URL</FormLabel>
                      <Input
                        {...field}
                        id="playStoreUrl"
                        onChange={(ev) => handleChangeField('playStoreUrl', ev, handleChange)}
                        onBlur={(ev) => handleBlurField(ev, handleBlur, validateForm)}
                      />
                      <FormErrorMessage>{errors.playStoreUrl}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Box>
            </Grid>
          </Form>
        )}
      </Formik>
      <Box mt={8} />
      <TagSelection initialTags={initialValues.tags || []} onChangeTags={onChangeTags} />
    </>
  );
};
MainDetails.propTypes = {
  onChange: PropTypes.func.isRequired,
  onChangeTags: PropTypes.func.isRequired,
  onSubmitToServer: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
};

MainDetails.defaultProps = {};

export default MainDetails;
