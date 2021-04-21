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

// utils
import { fieldsToMetadata } from '~/shared/metadataHelper';

interface IProps {
  data?: any;
}
const CustomerForm = forwardRef<any, IProps>((props, ref) => {
  // DECLARES
  const { formatMessage } = useIntl();
  const { data } = props;
  const t = (id, values?) => formatMessage({ id }, values);
  const [upsertUser] = userService.upsert(); //(userQueries.UPSERT_USER);
  const [form] = Form.useForm();

  const formSetFields = customer => {
    form.setFields([
      { name: ['user', 'name'], value: customer.name },
      { name: ['user', 'email'], value: customer.email },
      { name: ['user', 'image'], value: customer.image },
      { name: ['metadata', 'customerType'], value: customer.customerType },
      { name: ['metadata', 'address'], value: customer.address },
      { name: ['metadata', 'phone'], value: customer.phone },
    ]);
  };

  // EFFECT
  useEffect(
    () => {
      if (data && data.user) {
        formSetFields(data.user);
      }
    },
    [data],
  );

  /// EVENTS
  useImperativeHandle(ref, () => ({
    onSubmit,
  }));

  const onSubmit = () => {
    form
      .validateFields()
      .then(values => {
        
        const user = data.user
        ? { id: data.user.id, ...values.user }
        : values.user;
        
        const metadata = fieldsToMetadata(values.metadata);

        upsertUser({
          variables: { user, metadata },
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
        name={['user', 'name']}
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

      <Form.Item
        name={['user', 'email']}
        label={t('customerCreateform.label.email')}
      >
        <Input type="email" />
      </Form.Item>

      <Form.Item
        name={['metadata', 'customerType']}
        label={t('customerCreateform.label.type')}
      >
        <ComboBoxEnum type={CustomerType} />
      </Form.Item>

      <Form.Item
        name={['user', 'image']}
        label={t('customerCreateform.label.image')}
      >
        <UploadImage setImageUrl={onSetImageUrl} />
      </Form.Item>

      <Form.Item
        name={['metadata', 'address']}
        label={t('customerCreateform.label.address')}
      >
        <Input type="address" />
      </Form.Item>

      <Form.Item
        name={['metadata', 'phone']}
        label={t('customerCreateform.label.phone')}
      >
        <Input type="phone" />
      </Form.Item>
    </Form>
  );
});

export default CustomerForm;
