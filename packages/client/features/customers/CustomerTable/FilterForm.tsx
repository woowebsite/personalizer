import { Form, Input, Select, Button } from 'antd';
import React from 'react';
import CustomerType from '~/models/CustomerType';
import ComboBoxEnum from 'components/ComboBoxEnum'

const FilterForm = ({ values, onFilter }) => {
  // DEFINE
  const [form] = Form.useForm();

  // EVENTS
  const handleFinish = () => {
    form
      .validateFields()
      .then(values => {
        let queries = values;
        if (values.name || !!!values.name) queries.name = `%${values.name}%`;
        onFilter(queries);
      })
      .catch(errorInfo => {
        console.log('Error: ', errorInfo);
      });
  };

  return (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={values}
      layout="inline"
      onFinish={handleFinish}
      name="basic"
      form={form}
      labelAlign="left"
    >
      <Form.Item label="Name" name="name">
        <Input />
      </Form.Item>

      <Form.Item label="Type" name="customerType">
        <ComboBoxEnum  type={CustomerType} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Filter
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FilterForm;
