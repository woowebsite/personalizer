import { Form, Input, Button, Row, Col } from 'antd';
import { useIntl } from 'react-intl';
import useTranslate from 'hooks/useTranslate';
import React from 'react';
import { fieldsToMetadata } from '~/shared/metadataHelper';

const QuickForm = ({ values, onSave, onCancel }) => {
  const { formatMessage } = useIntl();
  const t = (id, values?) => formatMessage({ id }, values);
  // DEFINE
  const [form] = Form.useForm();

  // EVENTS
  const handleFinish = () => {
    form
      .validateFields()
      .then(formValues => {
        const updated = {
          job: {
            id: values.id,
            title: formValues.title,
            description: formValues.description,
          },
          metadata: fieldsToMetadata({
            link: formValues.link,
          }),
          taxonomies: [],
        };

        onSave(updated);
      })
      .catch(errorInfo => {
        console.log('Error: ', errorInfo);
      });
  };

  console.log('values', values);
  return (
    <Form
      form={form}
      initialValues={values}
      onFinish={handleFinish}
      name="basic"
      size="small"
      labelAlign="left"
    >
      <Row gutter={12}>
        <Col span={8}>
          <Form.Item
            label={t('jobTable.columns.title')}
            name="title"
            rules={[
              {
                required: true,
                message: useTranslate('validator.required', {
                  field: 'changePasswordForm.label.current',
                }),
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label={t('jobTable.columns.description')}
            name="description"
          >
            <Input.TextArea />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label={t('jobTable.columns.link')} name="link">
            <Input.TextArea />
          </Form.Item>
        </Col>
      </Row>

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
