import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { Modal, Form, Input, Button, Upload, message } from 'antd';
import { useIntl } from 'react-intl';

// components
import UploadImage from '~/components/UploadImage';
import ComboBox from '~/components/ComboBox';
import ComboBoxType from '~/components/ComboBox/ComboBoxType';
import useTranslate from 'hooks/useTranslate';

// graphql
import userService from 'services/userService';

interface IProps {
  id?: number;
}
const UserForm = forwardRef<any, IProps>((props, ref) => {
  // DECLARES
  const { formatMessage } = useIntl();
  const { id: userId } = props;
  const t = (id, values?) => formatMessage({ id }, values);
  const [upsertUser] = userService.upsert(); //(userQueries.UPSERT_USER);
  const [form] = Form.useForm();

  const { data, loading, refetch } = userService.get({
    variables: {
      where: { id: userId },
    },
  });

  const formSetFields = user => {
    form.setFields([
      { name: 'role_id', value: user.role_id },
      { name: 'name', value: user.name },
      { name: 'email', value: user.email },
      { name: 'image', value: user.image },
    ]);
  };

  // EFFECT
  useEffect(
    () => {
      if (props.id) {
        if (!loading) {
          formSetFields(data.user);
        }
      }
    },
    [props.id, loading, data],
  );

  /// EVENTS
  useImperativeHandle(ref, () => ({
    submit,
  }));

  const submit = () => {
    form
      .validateFields()
      .then(values => {
        const data = props.id ? { id: props.id, ...values } : values;
        upsertUser({
          variables: { user: data, metadata: []},
        });
      })
      .catch(errorInfo => {
        console.log('Error: ', errorInfo);
      });
  };

  const onSetImageUrl = filename => {
    form.setFieldsValue({ image: filename });
  };

  return (
    <Form
      id="UserForm"
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={submit}
      layout="vertical"
    >
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: useTranslate('validator.required', {
              field: 'userCreateform.label.name',
            }),
          },
        ]}
        label={t('userCreateform.label.name')}
      >
        <Input />
      </Form.Item>

      <Form.Item name="email" label={t('userCreateform.label.email')}>
        <Input type="email" />
      </Form.Item>

      <Form.Item name="role_id" label={t('userCreateform.label.role')}>
        <ComboBox type={ComboBoxType.Role} valueField="id" textField="name" />
      </Form.Item>

      <Form.Item name="image" label={t('userCreateform.label.image')}>
        <UploadImage setImageUrl={onSetImageUrl} />
      </Form.Item>
    </Form>
  );
});

export default UserForm;
