import { Form, Input, Button } from 'antd';
import { useIntl } from 'react-intl';

const QuickForm = ({ values, onSave, onCancel }) => {
  const { formatMessage } = useIntl();
  const t = (id, values?) => formatMessage({ id }, values);
  // DEFINE
  const [form] = Form.useForm();

  // EVENTS
  const handleFinish = () => {
    form
      .validateFields()
      .then(values => {
        onSave(values);
      })
      .catch(errorInfo => {
        console.log('Error: ', errorInfo);
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
      size="small"
      labelAlign="left"
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" className="mr-2" htmlType="submit">
          {t('buttons.save')}
        </Button>
        <Button htmlType="button" type="default" onClick={onCancel}>
          {t('buttons.cancel')}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default QuickForm;
