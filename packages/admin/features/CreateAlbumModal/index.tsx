import React from 'react';
import { Modal, Form, Input, Button, Upload, message } from 'antd';
import UploadImage from '~/components/UploadImage';

// graphql
import { withApollo } from 'apollo/apollo';
import albumService from 'services/albumService';

const CreateAlbumModal = (props) => {
  const [form] = Form.useForm();
  const [createAlbum] = albumService.create();

  const onSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        createAlbum({ variables: { album: values } }).finally(() => {
          props.onFinish();
          props.setVisible(false);
        });
      })
      .catch((errorInfo) => {
        console.log('Error: ', errorInfo);
      });
  };

  const onCancel = (e) => {
    props.setVisible(false);
    e.stopPropagation();
  };

  const onSetImageUrl = (filename) => {
    form.setFieldsValue({ image: filename });
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
