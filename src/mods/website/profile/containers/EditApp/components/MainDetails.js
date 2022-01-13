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
  Text,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as yup from 'yup';
import {
  AndroidOutlined,
  AppleFilled,
  FacebookFilled,
  GithubOutlined,
  GlobalOutlined,
  InstagramFilled,
  LinkedinOutlined,
  TwitterCircleFilled,
} from '@ant-design/icons';
import TagSelection from './TagSelection';

const Wrapper = styled.div`
  .fc-inline {
    display: flex;

    label {
      margin-top: 10px;
    }

    .input-inline {
      margin-left: 1rem;
      flex-grow: 1;
    }
  }
`;

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
    <Wrapper>
      <Grid templateColumns="repeat(2, 1fr)" gap={8}>
        <GridItem>
          <Formik
            enableReinitialize
            validationSchema={MainDetailsSchema}
            initialValues={initialValues}
          >
            {({ errors, touched, handleBlur, handleChange, validateForm }) => (
              <Form>
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
                <Heading as="h3" size="md" mt={16}>
                  App Links
                </Heading>
                <Text color="gray.400">How will potential users find your app?</Text>
                <Field name="websiteUrl">
                  {({ field }) => (
                    <FormControl
                      isInvalid={errors.websiteUrl && touched.websiteUrl}
                      mt={8}
                      className="fc-inline"
                    >
                      <FormLabel htmlFor="websiteUrl">
                        <GlobalOutlined style={{ fontSize: 20 }} />
                      </FormLabel>
                      <Box className="input-inline">
                        <Input
                          {...field}
                          id="websiteUrl"
                          onChange={(ev) => handleChangeField('websiteUrl', ev, handleChange)}
                          onBlur={(ev) => handleBlurField(ev, handleBlur, validateForm)}
                          placeholder="Your website"
                        />
                        <FormErrorMessage>{errors.websiteUrl}</FormErrorMessage>
                      </Box>
                    </FormControl>
                  )}
                </Field>
                <Field name="appStoreUrl">
                  {({ field }) => (
                    <FormControl
                      isInvalid={errors.appStoreUrl && touched.appStoreUrl}
                      mt={8}
                      className="fc-inline"
                    >
                      <FormLabel htmlFor="appStoreUrl">
                        <AppleFilled style={{ fontSize: 20 }} />
                      </FormLabel>
                      <Box className="input-inline">
                        <Input
                          {...field}
                          id="appStoreUrl"
                          placeholder="App Store link"
                          onChange={(ev) => handleChangeField('appStoreUrl', ev, handleChange)}
                          onBlur={(ev) => handleBlurField(ev, handleBlur, validateForm)}
                        />
                        <FormErrorMessage>{errors.appStoreUrl}</FormErrorMessage>
                      </Box>
                    </FormControl>
                  )}
                </Field>
                <Field name="playStoreUrl">
                  {({ field }) => (
                    <FormControl
                      isInvalid={errors.playStoreUrl && touched.playStoreUrl}
                      mt={8}
                      className="fc-inline"
                    >
                      <FormLabel htmlFor="playStoreUrl">
                        <AndroidOutlined style={{ fontSize: 20 }} />
                      </FormLabel>
                      <Box className="input-inline">
                        <Input
                          {...field}
                          id="playStoreUrl"
                          placeholder="Google Play Store link"
                          onChange={(ev) => handleChangeField('playStoreUrl', ev, handleChange)}
                          onBlur={(ev) => handleBlurField(ev, handleBlur, validateForm)}
                        />
                        <FormErrorMessage>{errors.playStoreUrl}</FormErrorMessage>
                      </Box>
                    </FormControl>
                  )}
                </Field>
                <Heading as="h3" size="md" mt={16}>
                  Social Media Pages
                </Heading>
                <Text color="gray.400">Where else can users find you?</Text>
                <Field name="socialUrls.facebook">
                  {({ field }) => (
                    <FormControl
                      isInvalid={errors.socialUrls?.facebook && touched.socialUrls?.facebook}
                      mt={8}
                      className="fc-inline"
                    >
                      <FormLabel htmlFor="facebook">
                        <FacebookFilled style={{ fontSize: 20 }} />
                      </FormLabel>
                      <Box className="input-inline">
                        <Input
                          {...field}
                          id="facebook"
                          placeholder="Facebook"
                          onChange={(ev) =>
                            handleChangeField('socialUrls.facebook', ev, handleChange)
                          }
                          onBlur={(ev) => handleBlurField(ev, handleBlur, validateForm)}
                        />
                        <FormErrorMessage>{errors.socialUrls?.facebook}</FormErrorMessage>
                      </Box>
                    </FormControl>
                  )}
                </Field>
                <Field name="socialUrls.instagram">
                  {({ field }) => (
                    <FormControl
                      isInvalid={errors.socialUrls?.instagram && touched.socialUrls?.instagram}
                      mt={8}
                      className="fc-inline"
                    >
                      <FormLabel htmlFor="instagram">
                        <InstagramFilled style={{ fontSize: 20 }} />
                      </FormLabel>
                      <Box className="input-inline">
                        <Input
                          {...field}
                          id="instagram"
                          placeholder="Instagram"
                          onChange={(ev) =>
                            handleChangeField(['socialUrls.instagram'], ev, handleChange)
                          }
                          onBlur={(ev) => handleBlurField(ev, handleBlur, validateForm)}
                        />
                        <FormErrorMessage>{errors.socialUrls?.instagram}</FormErrorMessage>
                      </Box>
                    </FormControl>
                  )}
                </Field>
                <Field name="socialUrls.twitter">
                  {({ field }) => (
                    <FormControl
                      isInvalid={errors.socialUrls?.twitter && touched.socialUrls?.twitter}
                      mt={8}
                      className="fc-inline"
                    >
                      <FormLabel htmlFor="twitter">
                        <TwitterCircleFilled style={{ fontSize: 20 }} />
                      </FormLabel>
                      <Box className="input-inline">
                        <Input
                          {...field}
                          id="twitter"
                          placeholder="Twitter"
                          onChange={(ev) =>
                            handleChangeField(['socialUrls.twitter'], ev, handleChange)
                          }
                          onBlur={(ev) => handleBlurField(ev, handleBlur, validateForm)}
                        />
                        <FormErrorMessage>{errors.socialUrls?.twitter}</FormErrorMessage>
                      </Box>
                    </FormControl>
                  )}
                </Field>
                <Field name="socialUrls.linkedIn">
                  {({ field }) => (
                    <FormControl
                      isInvalid={errors.socialUrls?.linkedIn && touched.socialUrls?.linkedIn}
                      mt={8}
                      className="fc-inline"
                    >
                      <FormLabel htmlFor="linkedIn">
                        <LinkedinOutlined style={{ fontSize: 20 }} />
                      </FormLabel>
                      <Box className="input-inline">
                        <Input
                          {...field}
                          id="linkedIn"
                          placeholder="LinkedIn"
                          onChange={(ev) =>
                            handleChangeField(['socialUrls.linkedIn'], ev, handleChange)
                          }
                          onBlur={(ev) => handleBlurField(ev, handleBlur, validateForm)}
                        />
                        <FormErrorMessage>{errors.socialUrls?.linkedIn}</FormErrorMessage>
                      </Box>
                    </FormControl>
                  )}
                </Field>
                <Field name="socialUrls.github">
                  {({ field }) => (
                    <FormControl
                      isInvalid={errors.socialUrls?.github && touched.socialUrls?.github}
                      mt={8}
                      className="fc-inline"
                    >
                      <FormLabel htmlFor="github">
                        <GithubOutlined style={{ fontSize: 20 }} />
                      </FormLabel>
                      <Input
                        {...field}
                        id="github"
                        placeholder="Github"
                        onChange={(ev) =>
                          handleChangeField(['socialUrls.github'], ev, handleChange)
                        }
                        onBlur={(ev) => handleBlurField(ev, handleBlur, validateForm)}
                      />
                      <FormErrorMessage>{errors.socialUrls?.github}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Form>
            )}
          </Formik>
        </GridItem>
        <GridItem>
          <TagSelection initialTags={initialValues.tags || []} onChangeTags={onChangeTags} />
        </GridItem>
      </Grid>
    </Wrapper>
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
