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
const UserCreateForm = forwardRef<any, IProps>((props, ref) => {
  // DECLARES
  const { formatMessage } = useIntl();
  const { id: userId } = props;
  const t = (id, values?) => formatMessage({ id }, values);
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

  const onSetImageUrl = (filename) => {
    form.setFieldsValue({ image: filename });
  };

  return (
    <Form
      form={form}
      id='UserCreateForm'
      className={'shadow-sm p-3 bg-white pt-5 rounded'}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      onFinish={onSubmit}
      layout='horizontal'
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

export default UserCreateForm;
