import { Form, Input } from 'antd';

const ContactForm = ({ form, initialValues, onSubmit }) => {
  // EVENTS
  const handleFinish = () => {
    form
      .validateFields()
      .then(values => {
        let queries = values;
        if (values.name || !!!values.name) queries.name = `%${values.name}%`;
        onSubmit(queries);
      })
      .catch(errorInfo => {
        console.log('Error: ', errorInfo);
      });
  };
  return (
    <Form form={form} initialValues={initialValues} onFinish={handleFinish}>
      <Form.Item name="abc">
        <Input />
      </Form.Item>
    </Form>
  );
};

export default ContactForm;
