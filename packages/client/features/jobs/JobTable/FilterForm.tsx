import React from 'react';
import { Form, Input, Select, Button, Row, Col, DatePicker } from 'antd';
import { useIntl } from 'react-intl';
import _, { isBuffer } from 'lodash';

// comoonents
import ComboBoxTaxonomy, { TaxonomyType } from '~/components/ComboBoxTaxonomy';
import { fieldsToMetadata } from '~/shared/metadataHelper';
import ComboBox, { ComboBoxType } from '~/components/ComboBox';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

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
        if (values.job.publishDate) {
          queries.job.startPublishDate = values.job.publishDate
            .startOf('month')
            .toString();
          queries.job.endPublishDate = values.job.publishDate
            .endOf('month')
            .toString();
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
      className="mb-3 no-space-form"
      name="basic"
      size="small"
      form={form}
      labelAlign="left"
      {...layout}
    >
      <Col span="24">
        <Row gutter={12}>
          <Col span={6}>
            <Form.Item
              name={['job', 'publishDate']}
              label={t('jobTable.filter.month')}
            >
              <DatePicker picker="month" placeholder={'Chọn tháng'} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name={['job', 'title']}
              label={t('jobTable.columns.title')}
            >
              <Input placeholder={t('jobTable.columns.title')} allowClear />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name={['taxonomies', 'job_status']}
              label={t('jobTable.columns.status')}
            >
              <ComboBoxTaxonomy
                allowClear
                type={TaxonomyType.Job_Status}
                placeholder={t('jobTable.columns.status')}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name={['metadata', 'priority']}
              label={t('jobTable.columns.priority')}
            >
              <ComboBoxTaxonomy allowClear type={TaxonomyType.Job_Priority} />
            </Form.Item>
          </Col>
        </Row>
      </Col>

      <Col span="24" className="mt-2">
        <Row gutter={12}>
          <Col span={6}>
            <Form.Item
              name={['metadata', 'customer']}
              label={t('jobTable.filter.customer')}
            >
              <ComboBox
                textField="name"
                valueField="id"
                type={ComboBoxType.Customer}
                width="200"
                labelInValue
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name={['metadata', 'leader']}
              label={t('jobTable.filter.leader')}
            >
              <ComboBox
                textField="name"
                valueField="id"
                type={ComboBoxType.Leader}
                width="200"
                labelInValue
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name={['metadata', 'employee']}
              label={t('jobTable.filter.employee')}
            >
              <ComboBox
                textField="name"
                valueField="id"
                type={ComboBoxType.Employee}
                width="200"
                labelInValue
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {t('buttons.filter')}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Col>
    </Form>
  );
};

export default FilterForm;
