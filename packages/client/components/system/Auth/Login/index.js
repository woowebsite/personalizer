import React from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Radio, Tooltip } from 'antd'
import Link from 'next/link';
import style from '../style.module.scss'
import { login } from 'redux/user/actions';
import { signIn, signOut, useSession } from 'next-auth/client'

const Login = (props) => {
  const [form] = Form.useForm();
  const {
    user: { loading },
    authProvider,
    logo, dispatch
  } = props

  const onSubmit = data => {
    form.validateFields().then(values => {
      // dispatch(login(values));
      // signIn('credentials', { values })
      const user =  signIn('credentials', { email: values.email, password: values.password })
    }).catch(errorInfo => {
      console.log('Error: ', errorInfo);
    })
  }

  return (
    <div>
      <div className="text-center mb-5">
        <h1 className="mb-5">
          <strong>Welcome to {logo}</strong>
        </h1>
        <p>
          Pluggable enterprise-level application framework.
            <br />
            An excellent front-end solution for web applications built upon Ant Design.
            <br />
            Credentials for testing purposes - <strong>admin@mediatec.org</strong> /{' '}
          <strong>cleanui</strong>
        </p>
      </div>
      <div className={`card ${style.container}`}>
        <div className="text-dark font-size-24 mb-3">
          <strong>Sign in to your account</strong>
        </div>
        <Form form={form} id="loginForm" layout="vertical" hideRequiredMark onFinish={onSubmit} className="mb-4">
          <Form.Item name="email" initialValue='admin@x.com' rules={[{ required: true, message: 'Please input your e-mail address' }]}>
            <Input size="large" placeholder="Email" />
          </Form.Item>
          <Form.Item name="password" initialValue='1' rules={[{ required: true, message: 'Please input your password' }]} >
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
        <Link href="/auth/forgot-password" className="kit__utils__link font-size-16">
          Forgot Password?
          </Link>
      </div>
      <div className="text-center pt-2 mb-auto">
        <span className="mr-2">Don't have an account?</span>
        <Link href="/auth/register" className="kit__utils__link font-size-16">
          Sign up
          </Link>
      </div>
    </div>
  )
}

export default connect(({ user, settings }) => ({ user, authProvider: settings.authProvider, logo: settings.logo }))(Login)
