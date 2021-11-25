/* eslint-disable react/no-danger */
import React from 'react';
import { useMutation } from '@apollo/client';
import { Button, Col, Row, Typography, message } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AppBannerCarousel from 'mods/website/components/AppBannerCarousel';
import UpdateAppDraftStatusMtn from '../../../gql/UpdateAppDraftStatusMtn';

const Wrapper = styled.div`
  .submit-btn {
    margin-bottom: 2rem;
  }
  .title-container {
    display: flex;

    .logo {
      margin-right: 1rem;

      img {
        width: 80px;
        border-radius: 0.5rem;
      }
    }
  }

  .desc-container {
    margin-top: 1rem;
    border: 1px solid #f0f0f0;
    padding: 1rem;

    .desc {
      margin-top: 2rem;
    }
  }
`;

const Preview = ({ app }) => {
  const [updateAppStatus] = useMutation(UpdateAppDraftStatusMtn);

  const handleClickSubmit = async () => {
    try {
      const input = { appId: app.appId, status: 'submitted' };
      await updateAppStatus({ variables: { input } });
    } catch (error) {
      message.error(error.message.replace('GraphQL error :', ''));
    }
  };

  let logoSrc = '/img-sq-placeholder.png';
  if (app.logoImg?.medium) {
    logoSrc = app.logoImg.medium;
  }

  return (
    <Wrapper>
      <div className="submit-btn">
        <Row gutter={[64, 32]}>
          <Col md={24} lg={{ span: 8, offset: 16 }}>
            <Button type="primary" block onClick={handleClickSubmit}>
              Submit
            </Button>
          </Col>
        </Row>
      </div>
      <Row gutter={[32, 32]}>
        <Col md={24} lg={16}>
          <div className="title-container">
            <div className="logo">
              <img src={logoSrc} alt="logo" />
            </div>
            <div className="title">
              <Typography.Title level={3}>{app.name}</Typography.Title>
              <Typography.Text type="secondary">{app.shortDesc}</Typography.Text>
            </div>
          </div>
          <div className="desc-container">
            <AppBannerCarousel bannerImgs={app.bannerImgs || []} videoUrl={app.videoUrl} />
            <div
              className="desc"
              dangerouslySetInnerHTML={{
                __html: app.desc,
              }}
            />
          </div>
        </Col>
      </Row>
    </Wrapper>
  );
};

Preview.propTypes = {
  app: PropTypes.object.isRequired,
};

export default Preview;
