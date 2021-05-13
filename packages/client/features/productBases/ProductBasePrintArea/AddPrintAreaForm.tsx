import { Form, Input, Row, Col } from 'antd';

const AddPrintAreaForm = ({ form, initialValues, onSubmit }) => {
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
    <Form
      form={form}
      layout="vertical"
      className="vertical-compact"
      initialValues={initialValues}
      onFinish={handleFinish}
    >
      <Row gutter={12}>
        <Col span={8}>
          <Form.Item label="Name" name="name" tooltip="This is a required field">
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="FrontLabel" name="front" tooltip="This is a required field">
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Dimensions" tooltip="This is a required field">
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item name="width">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="height">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default AddPrintAreaForm;
