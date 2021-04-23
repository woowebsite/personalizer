import { Form, Input, Row, Col, Checkbox } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

// components
import UploadImage from '~/components/UploadImage';

const AddPrintAreaForm = ({ form, initialValues, onSubmit }) => {
  const { formatMessage } = useIntl();
  const t = (id, values?) => formatMessage({ id }, values);

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

  const onSetImageUrl = filename => {
    form.setFieldsValue({ image: filename });
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
          <Form.Item
            label={t('mockupBox.fields.name')}
            tooltip="This is a required field"
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label={t('mockupBox.fields.background')}
            tooltip="This is a required field"
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label={t('mockupBox.fields.dimensions')}
            tooltip="This is a required field"
          >
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
      <Row>
        <Col span={12}>
          <Form.Item name="preview" label={t('mockupBox.fields.preview')}>
            <UploadImage setImageUrl={onSetImageUrl} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="noise" label={t('mockupBox.fields.noise')}>
            <Checkbox>{t('mockupBox.fields.renderNoise')}</Checkbox>
            <span>{t('mockupBox.fields.renderNoiseDesc')}</span>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default AddPrintAreaForm;
