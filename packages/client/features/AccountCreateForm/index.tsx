import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Upload, message } from 'antd';
import UploadImage from 'components/personalizers/Upload';
import { useIntl } from 'react-intl';

// components
import ComboBox from 'components/ComboBox';
// graphql
import withQuery from 'shared/withQuery';
import { withApollo } from 'apollo/apollo';
import withMutation from 'shared/withMutation';
import * as queries from 'definitions/album-definitions';
import * as userQueries from 'definitions/user-definitions';

const AccountCreateForm = (props) => {
  // DECLARES
  const { data } = withQuery(userQueries.GET_USERS);
  const [form] = Form.useForm();
  const { formatMessage } = useIntl();
  const t = (id) => formatMessage({ id });
  const [uploadImage] = withMutation(queries.UPLOAD_FILE);
  const [createAlbum] = withMutation(queries.CREATE_ALBUM);

  /// EVENTS
  const onSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        createAlbum({ variables: values }).finally(() => {
          props.onFinish();
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
      className={"shadow-sm p-3 bg-white pt-5 rounded"}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      onFinish={onSubmit}
      layout='horizontal'
    >
      <Form.Item name='name' label={t('formCreateAccount.label.name')}>
        <Input />
      </Form.Item>

      <Form.Item
        name='description'
        label={t('formCreateAccount.label.description')}
      >
        <Input.TextArea />
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
};

export default AccountCreateForm;
