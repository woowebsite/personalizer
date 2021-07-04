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
    </Form>
  );
};

export default FilterForm;
