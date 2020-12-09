import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Upload, message } from 'antd';
import UploadImage from 'components/personalizers/Upload';

// graphql
import { withApollo } from 'apollo/apollo';
import withMutation from 'shared/withMutation';
import * as queries from '../queries';
import { useMutation } from '@apollo/react-hooks';

const CreateAlbumModal = (props) => {
  const [form] = Form.useForm();
  const [uploadImage] = withMutation(queries.UPLOAD_FILE);
  const [createAlbum] = withMutation(queries.CREATE_ALBUM);

  const onSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        createAlbum({ variables: values });
        props.reload();
        props.setVisible(false);
      })
      .catch((errorInfo) => {
        console.log('Error: ', errorInfo);
      });
  };

  const onCancel = (e) => {
    props.setVisible(false);
    e.stopPropagation();
  };

  const onSetImageUrl = (file) => {
    const promise = uploadImage({ variables: { file } });
    promise.then((resp) => {
      const imgUrl = resp.data.uploadFile.path;
      form.setFieldsValue({ image: imgUrl });
    });
  };

  return (
    <Modal
      title={props.title}
      visible={props.visible}
      onOk={onSubmit}
      onCancel={onCancel}
    >
      <Form
        form={form}
        id='createAlbumForm'
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        onFinish={onSubmit}
        layout='horizontal'
      >
        <Form.Item name='name' label='Name'>
          <Input />
        </Form.Item>

        <Form.Item name='description' label='Description'>
          <Input.TextArea />
        </Form.Item>

        <Form.Item name='image' label='Image'>
          <UploadImage setImageUrl={onSetImageUrl} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default withApollo({ ssr: false })(CreateAlbumModal);
