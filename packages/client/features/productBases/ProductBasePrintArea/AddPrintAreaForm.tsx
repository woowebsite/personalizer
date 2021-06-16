import { Form, Input, Row, Col } from 'antd';

const AddPrintAreaForm = ({ form, initialValues, onSubmit }) => {
  return (
    <Form
      form={form}
      layout="vertical"
      className="vertical-compact"
      initialValues={initialValues}
    >
      <Row gutter={12}>
        <Col span={8}>
          <Form.Item
            label="Name"
            name={['term', 'name']}
            tooltip="This is a required field"
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="FrontLabel"
            name={['metadata', 'front']}
            tooltip="This is a required field"
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Dimensions" tooltip="This is a required field">
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item name={['metadata', 'width']}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name={['metadata', 'height']}>
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
