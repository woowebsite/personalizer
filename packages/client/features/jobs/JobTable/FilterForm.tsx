import React from 'react';
import { Form, Input, Select, Button, Row, Col } from 'antd';
import { useIntl } from 'react-intl';
import _ from 'lodash';

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

        // metadata

        // execute
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
          <Form.Item
            label={t('jobTable.columns.title')}
            name={['job', 'title']}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span="6">
          <Form.Item
            label={t('jobTable.columns.status')}
            name={['taxonomies', 'job_status']}
          >
            <ComboBoxTaxonomy type={TaxonomyType.Job_Status} />
          </Form.Item>
        </Col>
        <Col span="6">
          <Form.Item
            label={t('jobTable.columns.priority')}
            name={['taxonomies', 'job_priority']}
          >
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
