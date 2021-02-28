import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { Modal, Form, Input, Button, Upload, message } from 'antd';
import { useIntl } from 'react-intl';

// components
import UploadImage from '~/components/UploadImage';
import ComboBox from '~/features/ComboBox';
import ComboBoxType from '~/features/ComboBox/ComboBoxType';
import useTranslate from 'hooks/useTranslate';

// graphql
import withMutation from 'shared/withMutation';
import withQuery from 'shared/withQuery';
import * as userQueries from 'definitions/user-definitions';

interface IProps {
  id?: number;
}
const UserForm = forwardRef<any, IProps>((props, ref) => {
  // DECLARES
  const { formatMessage } = useIntl();
  const { id: userId } = props;
  const t = (id, values?) => formatMessage({ id }, values);
  const [createUser] = withMutation(userQueries.CREATE_USER);
  const [upsertUser] = withMutation(userQueries.UPSERT_USER);
  const [form] = Form.useForm();

  const { data, loading, refetch } = withQuery(userQueries.GET_USER, {
    variables: {
      id: userId,
    },
  });

  const formSetFields = (user) => {
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
          console.log('load detail', data.user);
          formSetFields(data.user);
        }
      }
    },
    [props.id, loading, data]
  );

  /// EVENTS
  useImperativeHandle(ref, () => ({
    onSubmit,
  }));

  const onSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        if (props.id) {
          upsertUser({
            variables: {
              id: props.id,
              ...values,
            },
          });
        } else {
          createUser({ variables: values }).finally(() => {
            formSetFields(values);
          });
        }
      })
      .catch((errorInfo) => {
        console.log('Error: ', errorInfo);
      });
  };

  const onSetImageUrl = (filename) => {
    form.setFieldsValue({ image: filename });
  };

  return (
    <Form
      id='UserForm'
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onSubmit}
      layout='vertical'
    >
      <Form.Item
        name='name'
        rules={[
          {
            required: true,
            message: useTranslate('validator.required', {
              name: 'userCreateform.label.name',
            }),
          },
        ]}
        label={t('userCreateform.label.name')}
      >
        <Input />
      </Form.Item>

      <Form.Item name='email' label={t('userCreateform.label.email')}>
        <Input type='email' />
      </Form.Item>

      <Form.Item name='role' label={t('userCreateform.label.role')}>
        <ComboBox type={ComboBoxType.Role} valueField='id' textField='name' />
      </Form.Item>

      <Form.Item name='image' label={t('userCreateform.label.image')}>
        <UploadImage setImageUrl={onSetImageUrl} />
      </Form.Item>
    </Form>
  );
});

export default UserForm;
