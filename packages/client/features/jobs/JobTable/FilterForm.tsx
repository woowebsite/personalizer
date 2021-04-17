import React from 'react';
import { Form, Input, Select, Button, Row, Col } from 'antd';
import { useIntl } from 'react-intl';

// comoonents
import ComboBoxEnum from 'components/ComboBoxEnum';
import CustomerType from '~/models/CustomerType';
import JobPriority from '~/models/JobPriority';
import ComboBoxTaxonomy, { TaxonomyType } from '~/components/ComboBoxTaxonomy';

const FilterForm = ({ values, onFilter }) => {
  // DEFINE
  const [form] = Form.useForm();
  const { formatMessage } = useIntl();
  const t = (id, values?) => formatMessage({ id }, values);

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
      wrapperCol={{ span: 14 }}
      initialValues={values}
      onFinish={handleFinish}
      name="basic"
      size="small"
      form={form}
      labelAlign="left"
    >
      <Row>
        <Col span="6">
          <Form.Item label={t('jobTable.columns.title')} name="title">
            <Input />
          </Form.Item>
        </Col>
        <Col span="6">
          <Form.Item label={t('jobTable.columns.status')} name="status">
            <ComboBoxTaxonomy type={TaxonomyType.Job_Status} />
          </Form.Item>
        </Col>
        <Col span="6">
          <Form.Item label={t('jobTable.columns.priority')} name="priority">
            <ComboBoxTaxonomy type={TaxonomyType.Job_Priority} />
          </Form.Item>
        </Col>
        <Col span="6">
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {t('buttons.filter')}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default FilterForm;
