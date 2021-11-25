import React, { useEffect } from 'react';
import { DatePicker, Col, Row, Form, Input, Typography } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div``;

const MainDetails = ({ initialValues, onChange, onSubmitToServer }) => {
  const [updateForm] = Form.useForm();

  useEffect(() => {
    updateForm.setFieldsValue(initialValues);
  }, [initialValues?._id]);

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };

  return (
    <Wrapper>
      <Form
        {...formItemLayout}
        form={updateForm}
        layout="horizontal"
        className="new-app-form"
        onValuesChange={onChange}
        onFinish={onSubmitToServer}
        colon={false}
      >
        <Row gutter={[28, 28]}>
          <Col xs={24} sm={24} md={{ span: 16, offset: 4 }} lg={{ span: 14, offset: 5 }}>
            <Form.Item
              label="Name of your app"
              name="name"
              maxLength={30}
              hasFeedback
              rules={[{ required: true, message: 'Name of app is required.' }]}
            >
              <Input onBlur={updateForm.submit} />
            </Form.Item>
            <Form.Item
              label="Short description / Slogan"
              name="shortDesc"
              rules={[{ required: true, message: 'A short description is required.' }]}
              hasFeedback
            >
              <Input maxLength={80} onBlur={updateForm.submit} />
            </Form.Item>
            <Form.Item label="Publish date" name="publishDate" hasFeedback>
              <DatePicker
                format="MM-DD-YYYY"
                style={{ width: '250px' }}
                onBlur={updateForm.submit}
              />
            </Form.Item>
            <Form.Item>
              <Typography.Title level={5}>App Links</Typography.Title>
            </Form.Item>
            <Form.Item label="Website URL" name="websiteUrl" hasFeedback>
              <Input onBlur={updateForm.submit} />
            </Form.Item>
            <Form.Item label="App Store URL" name="appStoreUrl" hasFeedback>
              <Input onBlur={updateForm.submit} />
            </Form.Item>
            <Form.Item label="Play Store URL" name="playStoreUrl" hasFeedback>
              <Input onBlur={updateForm.submit} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
};

MainDetails.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmitToServer: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
};

MainDetails.defaultProps = {};

export default MainDetails;
