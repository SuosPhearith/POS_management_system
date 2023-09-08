import React from 'react';
import style from './LoginForm.module.css';
import { Button, Form, Input } from 'antd';
const LoginForm = ({ handleLogin }) => {
  return (
    <div className={style.container}>
      <div className={style.login}>ចូលគណនី</div>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={handleLogin}
        autoComplete="on"
      >
        <Form.Item
          label="ឈ្មោះគណនី"
          name="username"
          rules={[
            {
              required: true,
              message: 'សូមបញ្ចូលឈ្មោះគណនី​​!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="លេខសម្ងាត់​​"
          name="password"
          rules={[
            {
              required: true,
              message: 'សូមបញ្ចូលលេខសម្ងាត់​​!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          className={style.loginBtn}
        >
          <Button type="primary" htmlType="submit" className={style.btn}>
            ចូល
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginForm;
