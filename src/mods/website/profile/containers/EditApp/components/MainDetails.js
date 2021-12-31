import React from 'react';
import {
  Box,
  Grid,
  GridItem,
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
  socialUrls: yup
    .object({
      facebook: yup.string().max(120, 'Too long').url('Invalid URL').nullable(),
      instagram: yup.string().max(120, 'Too long').url('Invalid URL').nullable(),
      twitter: yup.string().max(120, 'Too long').url('Invalid URL').nullable(),
      linkedIn: yup.string().max(120, 'Too long').url('Invalid URL').nullable(),
      github: yup.string().max(120, 'Too long').url('Invalid URL').nullable(),
    })
    .nullable(),
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
              <GridItem>
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
              </GridItem>
              <GridItem>
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
              </GridItem>
              <GridItem colSpan={2}>
                <Heading as="h3" size="md">
                  Social Media
                </Heading>
                <Grid templateColumns="repeat(2, 1fr)" gap={8}>
                  <GridItem>
                    <Field name="socialUrls.facebook">
                      {({ field }) => (
                        <FormControl
                          isInvalid={errors.socialUrls?.facebook && touched.socialUrls?.facebook}
                          mt={8}
                        >
                          <FormLabel htmlFor="facebook">Facebook</FormLabel>
                          <Input
                            {...field}
                            id="facebook"
                            onChange={(ev) =>
                              handleChangeField('socialUrls.facebook', ev, handleChange)
                            }
                            onBlur={(ev) => handleBlurField(ev, handleBlur, validateForm)}
                          />
                          <FormErrorMessage>{errors.socialUrls?.facebook}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="socialUrls.instagram">
                      {({ field }) => (
                        <FormControl
                          isInvalid={errors.socialUrls?.instagram && touched.socialUrls?.instagram}
                          mt={8}
                        >
                          <FormLabel htmlFor="instagram">Instagram</FormLabel>
                          <Input
                            {...field}
                            id="instagram"
                            onChange={(ev) =>
                              handleChangeField(['socialUrls.instagram'], ev, handleChange)
                            }
                            onBlur={(ev) => handleBlurField(ev, handleBlur, validateForm)}
                          />
                          <FormErrorMessage>{errors.socialUrls?.instagram}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="socialUrls.twitter">
                      {({ field }) => (
                        <FormControl
                          isInvalid={errors.socialUrls?.twitter && touched.socialUrls?.twitter}
                          mt={8}
                        >
                          <FormLabel htmlFor="twitter">Twitter</FormLabel>
                          <Input
                            {...field}
                            id="twitter"
                            onChange={(ev) =>
                              handleChangeField(['socialUrls.twitter'], ev, handleChange)
                            }
                            onBlur={(ev) => handleBlurField(ev, handleBlur, validateForm)}
                          />
                          <FormErrorMessage>{errors.socialUrls?.twitter}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </GridItem>
                  <GridItem>
                    <Field name="socialUrls.linkedIn">
                      {({ field }) => (
                        <FormControl
                          isInvalid={errors.socialUrls?.linkedIn && touched.socialUrls?.linkedIn}
                          mt={8}
                        >
                          <FormLabel htmlFor="linkedIn">LinkedIn</FormLabel>
                          <Input
                            {...field}
                            id="linkedIn"
                            onChange={(ev) =>
                              handleChangeField(['socialUrls.linkedIn'], ev, handleChange)
                            }
                            onBlur={(ev) => handleBlurField(ev, handleBlur, validateForm)}
                          />
                          <FormErrorMessage>{errors.socialUrls?.linkedIn}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="socialUrls.github">
                      {({ field }) => (
                        <FormControl
                          isInvalid={errors.socialUrls?.github && touched.socialUrls?.github}
                          mt={8}
                        >
                          <FormLabel htmlFor="github">Github</FormLabel>
                          <Input
                            {...field}
                            id="github"
                            onChange={(ev) =>
                              handleChangeField(['socialUrls.github'], ev, handleChange)
                            }
                            onBlur={(ev) => handleBlurField(ev, handleBlur, validateForm)}
                          />
                          <FormErrorMessage>{errors.socialUrls?.github}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </GridItem>
                </Grid>
              </GridItem>
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
