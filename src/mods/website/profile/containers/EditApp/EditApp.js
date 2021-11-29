import React, { useEffect, useState } from 'react';
import { Heading, Flex, Box, Skeleton } from '@chakra-ui/react';
import { useQuery, useMutation } from '@apollo/client';
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Editor from '../../../components/Editor/DynamicEditor';
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
  const { activeStep, setStep } = useSteps({
    initialStep: 0,
  });
  const localStorageDraftKey = `appDraft_${appId}`;

  const [initialValues, setInitialValues] = useState({});
  const [desc, setDesc] = useState('');
  const [descIsTouched, setDescIsTouched] = useState(false);
  const [initialDesc, setInitialDesc] = useState('');

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
      setInitialDesc(savedValues.desc || '');
      setDesc(savedValues.desc || '');
    }
  }, [activeStep]);

  const handleSubmitToServer = async () => {
    const savedValues = JSON.parse(localStorage.getItem(localStorageDraftKey));
    const {
      name,
      shortDesc,
      desc: savedDesc,
      videoUrl,
      playStoreUrl,
      appStoreUrl,
      websiteUrl,
      tags,
    } = savedValues;

    const tagIds = (tags || []).map((tag) => tag._id);

    const input = {
      appId,
      name,
      shortDesc,
      desc: savedDesc,
      videoUrl,
      playStoreUrl,
      appStoreUrl,
      websiteUrl,
      tagIds,
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
    localStorage.setItem(
      localStorageDraftKey,
      JSON.stringify({ ...savedValues, ...changedValues }),
    );
  };

  const handleChangeDesc = (value) => {
    setDescIsTouched(true);
    const lValues = JSON.parse(localStorage.getItem(localStorageDraftKey) || '{}');
    const updatedValues = { ...lValues, desc: value };
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
              <Box mt={12}>
                <Editor onChange={handleChangeDesc} initialHtmlValue={initialDesc} />
              </Box>
            </Step>
            <Step label="Preview and submit" key="preview">
              <Box mt={12}>
                <Preview app={data?.appDraft || {}} />
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
