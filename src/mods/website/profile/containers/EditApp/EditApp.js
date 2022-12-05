import React, { useEffect, useMemo, useState } from 'react';
import { Button, Heading, Flex, Box, Skeleton } from '@chakra-ui/react';
import { useQuery, useMutation } from '@apollo/client';
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import set from 'lodash/set';
import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { DEFAULT_EDITOR_VALUE } from 'mods/website/components/Editor/_utils';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Editor from '../../../components/Editor/Editor';
import WebsiteLayout from '../../../components/WebsiteLayout';
import AppDraftQry from '../../gql/AppDraftQry';
import UpdateAppDraftMtn from '../../gql/UpdateAppDraftMtn';
import MainDetails from './components/MainDetails';
import Assets from './components/Assets';
import Preview from './components/Preview';

const Wrapper = styled.div`
  .content-container {
    margin-top: 3rem;
  }

  .step-content {
    margin-top: 3rem;
  }
`;

const EditApp = () => {
  const router = useRouter();
  const { appId } = router.query;
  const { activeStep, setStep, nextStep, prevStep } = useSteps({
    initialStep: 0,
  });

  const localStorageDraftKey = useMemo(() => `appDraft_${appId}`, [router.query?.appId]);

  const [initialValues, setInitialValues] = useState({
    name: '',
    shortDesc: '',
    websiteUrl: '',
    playStoreUrl: '',
    appStoreUrl: '',
    socialUrls: {
      facebook: '',
      instagram: '',
      twitter: '',
      linkedIn: '',
      github: '',
    },
    tags: [],
  });
  const [desc, setDesc] = useState('');
  const [descIsTouched, setDescIsTouched] = useState(false);
  const [initialDesc, setInitialDesc] = useState(null);

  const { data, loading, error, refetch } = useQuery(AppDraftQry, {
    variables: { _id: appId },
    fetchPolicy: 'network-only',
    skip: !appId,
  });
  const [updateAppDraft] = useMutation(UpdateAppDraftMtn);

  useEffect(() => {
    const { appDraft: app } = data || {};
    if (app) {
      const lValues = JSON.parse(localStorage.getItem(localStorageDraftKey) || '{}');
      let initialValues0 = { ...app };
      if (lValues?._id === app._id) {
        initialValues0 = { ...app, ...lValues };
      }
      setInitialValues(initialValues0);
      localStorage.setItem(localStorageDraftKey, JSON.stringify(initialValues0));
    }
  }, [data]);

  useEffect(() => {
    if (activeStep === 2) {
      const savedValues = JSON.parse(localStorage.getItem(localStorageDraftKey));
      setInitialDesc(savedValues.jsonDesc || DEFAULT_EDITOR_VALUE);
      setDesc(savedValues.jsonDesc || DEFAULT_EDITOR_VALUE);
    }
  }, [activeStep]);

  const handleSubmitToServer = async () => {
    const savedValues = JSON.parse(localStorage.getItem(localStorageDraftKey));
    const {
      name,
      shortDesc,
      jsonDesc,
      videoUrl,
      playStoreUrl,
      appStoreUrl,
      websiteUrl,
      tags,
      socialUrls,
    } = savedValues;

    const tagIds = (tags || []).map((tag) => tag._id);

    const input = {
      appId,
      name,
      shortDesc,
      jsonDesc,
      videoUrl,
      playStoreUrl,
      appStoreUrl,
      websiteUrl,
      tagIds,
      socialUrls,
    };
    await updateAppDraft({ variables: { input } });
    refetch();
  };

  useEffect(() => {
    if (descIsTouched) {
      const timeout = setTimeout(handleSubmitToServer, 1000);
      return () => clearTimeout(timeout);
    }
    return () => undefined;
  }, [descIsTouched, desc]);

  const handleValuesChange = (changedValues) => {
    const savedValues = JSON.parse(localStorage.getItem(localStorageDraftKey));
    const newValues = { ...savedValues };
    Object.keys(changedValues).forEach((k) => set(newValues, k, changedValues[k]));
    localStorage.setItem(localStorageDraftKey, JSON.stringify(newValues));
  };

  const handleChangeDesc = (value) => {
    setDescIsTouched(true);
    const lValues = JSON.parse(localStorage.getItem(localStorageDraftKey) || '{}');
    const updatedValues = { ...lValues, jsonDesc: value || [] };
    localStorage.setItem(localStorageDraftKey, JSON.stringify(updatedValues));
    setDesc(value);
  };

  const handleChangeVideoUrl = (value) => {
    const lValues = JSON.parse(localStorage.getItem(localStorageDraftKey) || '{}');
    const updatedValues = { ...lValues, videoUrl: value };
    localStorage.setItem(localStorageDraftKey, JSON.stringify(updatedValues));
    setInitialValues((prevInitialValues) => ({ ...prevInitialValues, videoUrl: value }));
  };

  const handleChangeTags = (tags) => {
    const lValues = JSON.parse(localStorage.getItem(localStorageDraftKey) || '{}');
    const updatedValues = { ...lValues, tags };
    localStorage.setItem(localStorageDraftKey, JSON.stringify(updatedValues));
    setInitialValues((prevInitialValues) => ({ ...prevInitialValues, tags }));
    handleSubmitToServer();
  };

  let content = <Skeleton />;
  let editorComp = null;
  if (initialDesc) {
    editorComp = (
      <Editor
        onChange={handleChangeDesc}
        initialValue={initialDesc}
        placeholder="A good app description will take you far"
      />
    );
  }
  if (!loading) {
    if (error) {
      content = (
        <Heading as="h4" size="sm" color="tomato">
          {error.message}
        </Heading>
      );
    } else {
      content = (
        <Flex flexDir="column" width="100%">
          <Steps activeStep={activeStep} onClickStep={(step) => setStep(step)}>
            <Step label="Main Details" key="main-details">
              <Flex width="100%" justify="flex-end" mt={12}>
                <Button
                  onClick={nextStep}
                  rightIcon={<ArrowRightOutlined />}
                  colorScheme="green"
                  variant="outline"
                >
                  Next
                </Button>
              </Flex>
              <Box mt={12}>
                <MainDetails
                  onChange={handleValuesChange}
                  onChangeTags={handleChangeTags}
                  onSubmitToServer={handleSubmitToServer}
                  initialValues={initialValues}
                />
              </Box>
            </Step>
            <Step label="Assets" key="assets">
              <Flex width="100%" justify="flex-end" mt={12}>
                <Button
                  onClick={prevStep}
                  leftIcon={<ArrowLeftOutlined />}
                  colorScheme="green"
                  variant="outline"
                  mr={2}
                >
                  Prev
                </Button>
                <Button
                  onClick={nextStep}
                  rightIcon={<ArrowRightOutlined />}
                  colorScheme="green"
                  variant="outline"
                >
                  Next
                </Button>
              </Flex>
              <Box mt={12}>
                <Assets
                  appId={appId}
                  app={data?.appDraft || {}}
                  refetch={refetch}
                  videoUrl={initialValues.videoUrl}
                  onChangeVideoUrl={handleChangeVideoUrl}
                  onSubmitToServer={handleSubmitToServer}
                />
              </Box>
            </Step>
            <Step label="Description" key="desc">
              <Flex width="100%" justify="flex-end" mt={12}>
                <Button
                  onClick={prevStep}
                  leftIcon={<ArrowLeftOutlined />}
                  colorScheme="green"
                  variant="outline"
                  mr={2}
                >
                  Prev
                </Button>
                <Button
                  onClick={nextStep}
                  rightIcon={<ArrowRightOutlined />}
                  colorScheme="green"
                  variant="outline"
                >
                  Next
                </Button>
              </Flex>
              <Flex mt={12} justifyContent="center">
                <Box width="100%" maxWidth={800}>
                  {editorComp}
                </Box>
              </Flex>
            </Step>
            <Step label="Preview and submit" key="preview">
              <Box mt={12}>
                <Preview app={data?.appDraft || {}} onSubmitToServer={handleSubmitToServer} />
              </Box>
            </Step>
          </Steps>
        </Flex>
      );
    }
  }

  return (
    <WebsiteLayout>
      <Helmet title="Edit App" />
      <Wrapper>
        <div className="header">
          <Heading as="h1" size="lg">
            Edit App
          </Heading>
        </div>
        <div className="content-container">{content}</div>
      </Wrapper>
    </WebsiteLayout>
  );
};

export default EditApp;
