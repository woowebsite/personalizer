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
import ComboBoxEnum from '~/components/ComboBoxEnum';
import CustomerType from '~/models/CustomerType';

interface IProps {
  id?: number;
}
const CustomerForm = forwardRef<any, IProps>((props, ref) => {
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
      { name: 'role', value: user.role_id },
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
    onSubmit,
  }));

  const onSubmit = () => {
    form
      .validateFields()
      .then(values => {
        const data = props.id ? { id: props.id, ...values } : values;
        upsertUser({
          variables: { user: data },
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
      id="customerForm"
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onSubmit}
      layout="vertical"
    >
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: useTranslate('validator.required', {
              field: 'customerCreateform.label.name',
            }),
          },
        ]}
        label={t('customerCreateform.label.name')}
      >
        <Input />
      </Form.Item>

      <Form.Item name="email" label={t('customerCreateform.label.email')}>
        <Input type="email" />
      </Form.Item>

      <Form.Item name="customer_type" label={t('customerCreateform.label.type')}>
        <ComboBoxEnum type={CustomerType}  />
      </Form.Item>

      <Form.Item name="image" label={t('customerCreateform.label.image')}>
        <UploadImage setImageUrl={onSetImageUrl} />
      </Form.Item>

      <Form.Item name="address" label={t('customerCreateform.label.address')}>
        <Input type="address" />
      </Form.Item>

      <Form.Item name="phone" label={t('customerCreateform.label.phone')}>
        <Input type="phone" />
      </Form.Item>
    </Form>
  );
});

export default CustomerForm;
