import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Upload, message } from "antd";

// graphql
import { withApollo } from "apollo/apollo";
import { useMutation } from "@apollo/react-hooks";
import * as queries from "../queries";
import UploadImage from "~/components/personalizers/Upload";

const CreateAlbumModal = (props) => {
  const [form] = Form.useForm();
  const [uploadImage, { image }] = useMutation(queries.UPLOAD_FILE);
  const [createAlbum, { data }] = useMutation(queries.CREATE_ALBUM);

  const onSubmit = (data) => {
    form
      .validateFields()
      .then((values) => {
        createAlbum({ variables: values });
        props.setVisible(false);
      })
      .catch((errorInfo) => {
        console.log("Error: ", errorInfo);
      });
  };

  const onCancel = (e) => {
    props.setVisible(false);
    e.stopPropagation();
  };


  const onSetImageUrl = (file) => {
    const image = uploadImage({ variables: { file } });
    image.then((resp) => {
      form.setFieldsValue({ image: resp.data.uploadFile.path });
    })
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
        id="createAlbumForm"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        onFinish={onSubmit}
        layout="horizontal"
      >
        <Form.Item name="name" label="Name">
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>

        <Form.Item name="image" label="Image">
          <UploadImage setImageUrl={onSetImageUrl} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4 }}>
          <Button form="createAlbumForm" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default withApollo({ ssr: false })(CreateAlbumModal);
