import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { Modal, Form, Input, Button, Upload, message } from 'antd';
import { useIntl } from 'react-intl';
import { notification } from 'antd';

// components
import useTranslate from 'hooks/useTranslate';

// graphql
import withMutation from 'shared/withMutation';
import withQuery from 'shared/withQuery';
import * as userQueries from 'definitions/user-definitions';
import userService from 'services/userService';

interface IProps {
  user: any;
}
const ChangePasswordForm = forwardRef<any, IProps>((props, ref) => {
  // DECLARES
  const { user } = props;
  const { formatMessage } = useIntl();
  const t = (id, values?) => formatMessage({ id }, values);
  const [form] = Form.useForm();
  const [changePassword] = userService.changePassword({
    onCompleted: resp => {
      if (resp.changePassword.result) {
        notification.success({
          message: 'Notification Success',
          description: 'Save successfully',
          onClick: () => {
            console.log('Notification Clicked!');
          },
        });
      } else {
        notification.error({
          message: 'Notification Error',
          description: t('messages.changePassword.isValid'),
          onClick: () => {
            console.log('Notification Clicked!');
          },
        });
      }
    },
  });

  /// EVENTS
  useImperativeHandle(ref, () => ({
    submit: handleFinish,
  }));

  const handleFinish = () => {
    form
      .validateFields()
      .then(values => {
        changePassword({ variables: values });
      })
      .catch(errorInfo => {
        notification.error({
          message: 'Notification Error',
          description: errorInfo,
          onClick: () => {
            console.log('Notification Clicked!');
          },
        });
      });
  };

  // RENDER
  return (
    <Form
      form={form}
      id="ChangePasswordForm"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={handleFinish}
      layout="vertical"
    >
      {user.havePassword && (
        <Form.Item
          name="currentPassword"
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
      )}

      <Form.Item
        name="password"
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
        name="confirmPassword"
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
