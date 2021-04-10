import { Form, Input, Button } from "antd";

const QuickForm = ({ values, onSave }) => {
  // DEFINE
  const [form] = Form.useForm();

  // EVENTS
  const handleFinish = () => {
    form
      .validateFields()
      .then((values) => {
        onSave(values);
      })
      .catch((errorInfo) => {
        console.log("Error: ", errorInfo);
      });
  };

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 8 }}
      initialValues={values}
      onFinish={handleFinish}
      name="basic"
      form={form}
      labelAlign="left"
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default QuickForm;
