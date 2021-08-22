import React from 'react';
import { Form, Input, Select, Button, Row, Col } from 'antd';
import { useIntl } from 'react-intl';
import _ from 'lodash';

// comoonents
import ComboBoxEnum from 'components/ComboBoxEnum';
import CustomerType from '~/models/CustomerType';
import JobPriority from '~/models/JobPriority';
import ComboBoxTaxonomy, { TaxonomyType } from '~/components/ComboBoxTaxonomy';
import { fieldsToMetadata } from '~/shared/metadataHelper';
import ComboBox, { ComboBoxType } from '~/components/ComboBox';

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
        // job fields
        let queries: any = { job: values.job };
        if (
          typeof values.job.title !== 'undefined' &&
          values.job.title.length
        ) {
          queries.job.title = `%${values.title}%`;
        }

        // taxonomy fields
        if (values.taxonomies) {
          queries.taxonomies = _.values(_.pickBy(values.taxonomies));
        }

        // metadata fields
        if (values.metadata) {
          queries.metadata = fieldsToMetadata(values.metadata).map(x => ({
            key: x.key,
            value: x.value,
          }));
        }

        // execute
        onFilter(queries);
      })
      .catch(errorInfo => {
        console.log('Error: ', errorInfo);
      });
  };

  return (
    <Form
      initialValues={values}
      onFinish={handleFinish}
      layout="inline"
      name="basic"
      size="small"
      className="mb-3"
      form={form}
      labelAlign="left"
    >
      <Col span="24">
        <Row>
          <Form.Item name={['job', 'title']}>
            <Input placeholder={t('jobTable.columns.title')} allowClear />
          </Form.Item>
          <Form.Item name={['taxonomies', 'job_status']}>
            <ComboBoxTaxonomy
              allowClear
              type={TaxonomyType.Job_Status}
              placeholder={t('jobTable.columns.status')}
            />
          </Form.Item>
          <Form.Item name={['metadata', 'priority']}>
            <ComboBoxTaxonomy
              allowClear
              placeholder={t('jobTable.columns.priority')}
              type={TaxonomyType.Job_Priority}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {t('buttons.filter')}
            </Button>
          </Form.Item>
        </Row>
      </Col>

      <Col span="24" className="mt-2">
        <Row>
          <Form.Item name={['metadata', 'customer']}>
            <ComboBox
              textField="name"
              valueField="id"
              type={ComboBoxType.Customer}
              width="200"
              labelInValue
              placeholder={t('jobTable.filter.customer')}
              allowClear
            />
          </Form.Item>
          <Form.Item name={['metadata', 'leader']}>
            <ComboBox
              textField="name"
              valueField="id"
              type={ComboBoxType.Leader}
              width="200"
              labelInValue
              placeholder={t('jobTable.filter.leader')}
              allowClear
            />
          </Form.Item>
          <Form.Item name={['metadata', 'employee']}>
            <ComboBox
              textField="name"
              valueField="id"
              type={ComboBoxType.Employee}
              width="200"
              labelInValue
              placeholder={t('jobTable.filter.employee')}
              allowClear
            />
          </Form.Item>
        </Row>
      </Col>
    </Form>
  );
};

export default FilterForm;
