import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { Modal, Form, Input, Button, Upload, message } from 'antd';
import { useIntl } from 'react-intl';

// components
import useTranslate from 'hooks/useTranslate';

// graphql
import withMutation from 'shared/withMutation';
import withQuery from 'shared/withQuery';
import * as userQueries from 'definitions/user-definitions';

interface IProps {
  id?: number;
}
const ChangePasswordForm = forwardRef<any, IProps>((props, ref) => {
  // DECLARES
  const { formatMessage } = useIntl();
  const t = (id, values?) => formatMessage({ id }, values);
  const { id: userId } = props;
  const [createUser] = withMutation(userQueries.CREATE_USER);
  const [form] = Form.useForm();

  /// EVENTS
  useImperativeHandle(ref, () => ({
    onSubmit,
  }));

  if (props.id) {
    const { data, loading, refetch } = withQuery(userQueries.GET_USER, {
      variables: {
        id: userId,
      },
    });

    if (!loading) {
      form.setFields([
        { name: 'role', value: data.user.role.id },
        { name: 'name', value: data.user.name },
        { name: 'email', value: data.user.email },
        { name: 'image', value: data.user.image },
      ]);
    }
  }

  const onSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log('values', values);
        createUser({ variables: values }).finally(() => {
          // callback
          console.log('create callback');
        });
      })
      .catch((errorInfo) => {
        console.log('Error: ', errorInfo);
      });
  };


  // RENDER
  return (
    <Form
      form={form}
      id='ChangePasswordForm'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onSubmit}
      layout='vertical'
    >
      <Form.Item
        name='current'
        rules={[
          {
            required: true,
            message: useTranslate('validator.required', {
              name: 'changePasswordForm.label.current',
            }),
          },
        ]}
        label={t('changePasswordForm.label.current')}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name='password'
        rules={[
          {
            required: true,
            message: useTranslate('validator.required', {
              name: 'changePasswordForm.label.password',
            }),
          },
        ]}
        label={t('changePasswordForm.label.password')}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name='confirmPassword'
        rules={[
          {
            required: true,
            message: useTranslate('validator.required', {
              name: 'changePasswordForm.label.confirmPassword',
            }),
          },
        ]}
        label={t('changePasswordForm.label.confirmPassword')}
      >
        <Input.Password />
      </Form.Item>
    </Form>
  );
});

export default ChangePasswordForm;
