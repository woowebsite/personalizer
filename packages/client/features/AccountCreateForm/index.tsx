import React, { forwardRef, useImperativeHandle } from 'react';
import { Modal, Form, Input, Button, Upload, message } from 'antd';
import { useIntl } from 'react-intl';

// components
import UploadImage from 'components/personalizers/Upload';
import ComboBox from 'components/ComboBox';
import useTranslate from 'hooks/useTranslate';

// graphql
import withQuery from 'shared/withQuery';
import withMutation from 'shared/withMutation';
import * as queries from 'definitions/album-definitions';
import * as userQueries from 'definitions/user-definitions';

interface IProps {}
const AccountCreateForm = forwardRef<any, IProps>((props, ref) => {
  // DECLARES
  const { data } = withQuery(userQueries.GET_USERS);
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
      const imgUrl = resp.data.uploadFile.path;
      form.setFieldsValue({ image: imgUrl });
    });
  };

  return (
    <Form
      form={form}
      id='accountCreateForm'
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
              name: 'formCreateAccount.label.name',
            }),
          },
        ]}
        label={t('formCreateAccount.label.name')}
      >
        <Input />
      </Form.Item>

      <Form.Item name='email' label={t('formCreateAccount.label.email')}>
        <Input type='email' />
      </Form.Item>

      <Form.Item name='role' label={t('formCreateAccount.label.role')}>
        {data && data.users && (
          <ComboBox dataSource={data.users} valueField='id' textField='name' />
        )}
      </Form.Item>

      <Form.Item name='avatar' label={t('formCreateAccount.label.avatar')}>
        <UploadImage setImageUrl={onSetImageUrl} />
      </Form.Item>
    </Form>
  );
});

export default AccountCreateForm;
