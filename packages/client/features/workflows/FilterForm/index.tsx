import React, { forwardRef, useImperativeHandle, useMemo } from 'react';
import _ from 'lodash';
import { useIntl } from 'react-intl';
import { Form, Input, Button } from 'antd';
import ComboBox, { ComboBoxType } from '~/components/ComboBox';
import ComboBoxTaxonomy, { TaxonomyType } from '~/components/ComboBoxTaxonomy';
import { fieldsToMetadata } from '~/shared/metadataHelper';

const FilterForm = forwardRef<any, any>(({ onFilter }, ref) => {
  // DEFINE
  const { formatMessage } = useIntl();
  const t = id => formatMessage({ id });
  const [form] = Form.useForm();

  // EVENTS
  useImperativeHandle(ref, () => ({
    submit: handleFinish,
  }));

  const handleFinish = () => {
    form
      .validateFields()
      .then(values => {
        let queries = values;
        if (typeof values.title !== 'undefined' && values.title.length) {
          queries.title = `%${values.title}%`;
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

        onFilter(queries);
      })
      .catch(errorInfo => {
        console.log('Error: ', errorInfo);
      });
  };

  return (
    <Form
      form={form}
      layout="inline"
      name="basic"
      labelAlign="left"
      size="small"
      onFinish={handleFinish}
    >
      <Form.Item name={['metadata', 'employee']}>
        <ComboBox
          placeholder={t('filter.labels.employee')}
          type={ComboBoxType.Employee}
          allowClear
          textField="name"
          valueField="id"
          style={{ width: 150 }}
        />
      </Form.Item>

      <Form.Item data-type="object" name={['metadata', 'customer']}>
        <ComboBox
          placeholder={t('filter.labels.customer')}
          type={ComboBoxType.Customer}
          allowClear
          textField="name"
          valueField="id"
          style={{ width: 150 }}
        />
      </Form.Item>

      <Form.Item name="title">
        <Input placeholder={t('filter.labels.title')} />
      </Form.Item>

      <Form.Item name={['taxonomies', 'job_priority']}>
        <ComboBoxTaxonomy
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
});

export default FilterForm;
