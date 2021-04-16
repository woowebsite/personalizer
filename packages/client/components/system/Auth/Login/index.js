import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Radio, Tooltip, Typography } from 'antd';
import Link from 'next/link';
import style from '../style.module.scss';
import { login } from 'redux/user/actions';
import { signIn, signOut, useSession } from 'next-auth/client';
import { useIntl } from 'react-intl';
import SocialConenct from '~/features/SocialConnect';

const Login = props => {
  const [form] = Form.useForm();
  const { formatMessage } = useIntl();
  const t = (id, values) => formatMessage({ id }, values);

  const {
    user: { loading },
    dispatch,
  } = props;

  const onSubmit = data => {
    form
      .validateFields()
      .then(values => {
        signIn('credentials', {
          email: values.email,
          password: values.password,
          callbackUrl: '/users/albums'
        });
        // signIn('email', { email: values.email, callbackUrl: '/users/albums' });
      })
      .catch(errorInfo => {
        console.log('Error: ', errorInfo);
      });
  };

  return (
    <div className={style.loginWrap}>
      <div className="text-center mb-5">
        <h1 className="mb-5">
          <strong>{t('signin')}</strong>
        </h1>
      </div>

      <div className={`card ${style.container}`}>
        <div className="text-dark font-size-24 text-center mb-3">
          <strong>Sign in with email</strong>
        </div>
        <Form
          form={form}
          id="loginForm"
          layout="vertical"
          hideRequiredMark
          onFinish={onSubmit}
          className="mb-4"
        >
          <Form.Item
            name="email"
            initialValue="wooowebsite@gmail.com"
            rules={[
              { required: true, message: 'Please input your e-mail address' },
            ]}
          >
            <Input size="large" placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            initialValue="1"
            rules={[{ required: true, message: 'Please input your password' }]}
          >
            <Input size="large" type="password" placeholder="Password" />
          </Form.Item>
          <Button
            form="loginForm"
            type="primary"
            size="large"
            className="text-center w-100"
            htmlType="submit"
            loading={loading}
          >
            <strong>Sign in</strong>
          </Button>
        </Form>
        <Link href="/auth/forgot-password">Forgot Password?</Link>
      </div>
      <div className="text-center pt-2 mb-auto mt-4">
        <span className="mr-2">Don't have an account?</span>
        <h4 className="mb-2">
          <strong>{t('signin')}</strong>
        </h4>
        <div className="d-flex justify-content-around">
          <SocialConenct visibleTwitter={false} />
        </div>
      </div>
    </div>
  );
};

export default connect(({ user, settings }) => ({ user }))(Login);
