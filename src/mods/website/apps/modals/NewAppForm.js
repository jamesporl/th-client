import React from 'react';
import { Form, Input } from 'antd';
import useStores from 'core/stores/useStores';
import { observer } from 'mobx-react';

function NewAppForm() {
  const { uiStore } = useStores();
  const { form, onFinish } = uiStore.globalModalParams.context;

  return (
    <Form form={form} onFinish={onFinish} layout="vertical" preserve={false}>
      <Form.Item
        label="Name of your app"
        name="name"
        hasFeedback
        rules={[{ required: true, message: 'Name of app is required.' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Short description / Slogan"
        name="shortDesc"
        hasFeedback
        rules={[{ required: true, message: 'A short description is required.' }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
}

export default observer(NewAppForm);
