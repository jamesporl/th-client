import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Skeleton, Typography } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Editor from '../../../components/Editor/DynamicEditor';
import WebsiteLayout from '../../../components/WebsiteLayout';
import EditAppSteps from './components/EditAppSteps';
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
  const localStorageDraftKey = `appDraft_${appId}`;

  const [activeStep, setActiveStep] = useState(0);
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
      if (initialValues0.publishDate && typeof initialValues0.publishDate === 'string') {
        initialValues0.publishDate = moment(initialValues0.publishDate);
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
      publishDate,
    } = savedValues;
    const input = {
      appId,
      name,
      shortDesc,
      desc: savedDesc,
      videoUrl,
      playStoreUrl,
      appStoreUrl,
      websiteUrl,
      publishDate: publishDate ? moment(publishDate).format('YYYY-MM-DD') : undefined,
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

  const handleChangeVideoUrl = (ev) => {
    const { value } = ev.target;
    const lValues = JSON.parse(localStorage.getItem(localStorageDraftKey) || '{}');
    const updatedValues = { ...lValues, videoUrl: value };
    localStorage.setItem(localStorageDraftKey, JSON.stringify(updatedValues));
    setInitialValues((prevInitialValues) => ({ ...prevInitialValues, videoUrl: value }));
  };

  let content = <Skeleton />;
  if (!loading) {
    if (error) {
      content = (
        <Typography.Title level={4} type="danger">
          {error.message}
        </Typography.Title>
      );
    } else {
      let activeStepComp = null;

      if (activeStep === 0) {
        activeStepComp = (
          <MainDetails
            onChange={handleValuesChange}
            onSubmitToServer={handleSubmitToServer}
            initialValues={initialValues}
          />
        );
      } else if (activeStep === 1) {
        activeStepComp = (
          <Assets
            appId={appId}
            app={data?.appDraft || {}}
            refetch={refetch}
            videoUrl={initialValues.videoUrl}
            onChangeVideoUrl={handleChangeVideoUrl}
            onSubmitToServer={handleSubmitToServer}
          />
        );
      } else if (activeStep === 2) {
        activeStepComp = <Editor onChange={handleChangeDesc} initialHtmlValue={initialDesc} />;
      } else {
        activeStepComp = <Preview app={data?.appDraft || {}} />;
      }

      content = (
        <>
          <EditAppSteps activeStep={activeStep} onChangeStep={setActiveStep} />
          <div className="step-content">{activeStepComp}</div>
        </>
      );
    }
  }

  return (
    <WebsiteLayout>
      <Helmet title="Edit App" />
      <Wrapper>
        <div className="header">
          <Typography.Title level={2}>Edit App</Typography.Title>
        </div>
        <div className="content-container">{content}</div>
      </Wrapper>
    </WebsiteLayout>
  );
};

export default EditApp;
