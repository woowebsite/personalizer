import { Form, Input, Button } from 'antd';

const FilterForm = ({ values, onFilter }) => {
  // DEFINE
  const [form] = Form.useForm();

  // EVENTS
  const handleFinish = () => {
    form
      .validateFields()
      .then(values => {
        let queries = values;
        if (typeof values.name !== 'undefined' && values.name.length) {
          queries.name = `%${values.name}%`;
        }
        if (typeof values.email !== 'undefined' && values.email.length) {
          queries.email = `%${values.email}%`;
        }
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

      <Form.Item label="Email" name="email">
        <Input />
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
