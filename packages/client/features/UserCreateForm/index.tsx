import React, { forwardRef, useImperativeHandle } from 'react';
import { Modal, Form, Input, Button, Upload, message } from 'antd';
import { useIntl } from 'react-intl';

// components
import UploadImage from 'components/personalizers/Upload';
import ComboBox from '~/features/ComboBox';
import ComboBoxType from '~/features/ComboBox/ComboBoxType';
import useTranslate from 'hooks/useTranslate';

// graphql
import withMutation from 'shared/withMutation';
import * as queries from 'definitions/album-definitions';
import * as userQueries from 'definitions/user-definitions';

interface IProps {}
const UserCreateForm = forwardRef<any, IProps>((props, ref) => {
  // DECLARES
  const [form] = Form.useForm();
  const { formatMessage } = useIntl();
  const t = (id, values?) => formatMessage({ id }, values);
  const [uploadImage] = withMutation(queries.UPLOAD_FILE);
  const [createUser] = withMutation(userQueries.CREATE_USER);

  /// EVENTS
  useImperativeHandle(ref, () => ({
    onSubmit,
  }));

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

  const onSetImageUrl = (file) => {
    const promise = uploadImage({ variables: { file } });
    promise.then((resp) => {
      const { filename } = resp.data.uploadFile;
      form.setFieldsValue({ image: filename });
    });
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
          <ComboBox type={ComboBoxType.User} valueField='id' textField='email' />
      </Form.Item>

      <Form.Item name='image' label={t('userCreateform.label.image')}>
        <UploadImage setImageUrl={onSetImageUrl} />
      </Form.Item>
    </Form>
  );
});

export default UserCreateForm;
