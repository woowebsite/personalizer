import React from "react";
import { connect } from 'react-redux'
import MainLayout from "layouts/Main";
import { withApollo } from "apollo/apollo";
import { Form, Input, Button } from 'antd';
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const MUTATION = gql`
  mutation CreateAlbum ($name: String, $description: String) {
    createAlbum(data: {name: $name,description: $description, userId: 1}) {
      id
    }
  }
`;

const CreateAlbum = () => {
    const [form] = Form.useForm();
    const [createAlbum, { data }] = useMutation(MUTATION);

    const onSubmit = data => {
        form.validateFields().then(values => {
            // dispatch(login(values));
            createAlbum({ variables: values })
        }).catch(errorInfo => {
            console.log('Error: ', errorInfo);
        })
    }

    return (
        <MainLayout>
            <h1>Create Album</h1>
            <Form form={form}
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
                <Form.Item wrapperCol={{ offset: 4 }}>
                    <Button form="createAlbumForm" type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>

        </MainLayout>
    );
};

export default withApollo({ ssr: false })(CreateAlbum);
