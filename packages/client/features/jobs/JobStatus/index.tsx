import React, { useEffect, forwardRef, useImperativeHandle } from 'react';
import { Form, Button, Card } from 'antd';
import { useIntl } from 'react-intl';

// graphql
import TextEditable from '~/components/TextEditable';
import ComboBoxTaxonomy, { TaxonomyType } from '~/components/ComboBoxTaxonomy';
import ComboBox, { ComboBoxType } from '~/components/ComboBox';
import jobService from '~/services/jobService';
import JobStatus from '~/constants/jobStatus';
import useTranslate from '~/hooks/useTranslate';
import { fieldsToMetadata } from '~/shared/metadataHelper';

// utils
const JobStatusBox = forwardRef<any, any>((props, ref) => {
  const { formatMessage } = useIntl();
  const { initialValues } = props;
  const [upsertJob] = jobService.upsert(); //(userQueries.UPSERT_USER);
  const t = (id, values?) => formatMessage({ id }, values);
  const [form] = Form.useForm();

  // EFFECT
  useEffect(
    () => {
      if (initialValues) {
        formSetFields(initialValues);
      }
    },
    [initialValues],
  );

  const formSetFields = job => {
    form.setFields([
      // taxonomies
      {
        name: ['taxonomies', 'job_status'],
        value: parseInt(
          job.job_status ? job.job_status.value : JobStatus.Active,
        ),
      },

      // metadata
      {
        name: ['metadata', 'employee'],
        value: job.employee,
      },
      {
        name: ['metadata', 'leader'],
        value: job.leader,
      },
      {
        name: ['metadata', 'customer'],
        value: job.customer,
      },
      { name: ['metadata', 'priority'], value: job.priority },
    ]);
  };

  /// EVENTS
  useImperativeHandle(ref, () => ({
    submit,
    getFieldsValue,
    validateFields,
  }));

  const submit = job => {
    form
      .validateFields()
      .then(values => {
        // metadata fields
        const metadataFields = {
          ...values.metadata,
        };

        // taxonomies fields
        const taxonomyFields = values.taxonomies;

        // parse
        const metadata = fieldsToMetadata(metadataFields);
        const taxonomies = taxonomyFields ? Object.values(taxonomyFields) : [];

        upsertJob({
          variables: { job, metadata, taxonomies },
        });
      })
      .catch(errorInfo => {
        console.log('Error: ', errorInfo);
      });
  };
  const getFieldsValue = () => form.getFieldsValue();
  const validateFields = () => form.validateFields();

  return (
    <>
      <Form form={form}>
        <Card className="status-form mb-4" title={t('jobStatus.title')}>
          <Form.Item
            name={['taxonomies', 'job_status']}
            label={t('jobStatus.label.status')}
            rules={[
              {
                required: true,
                message: useTranslate('validator.required', {
                  field: 'jobStatus.label.status',
                }),
              },
            ]}
          >
            <TextEditable
              defaultValue={
                initialValues && initialValues.job_status
                  ? parseInt(initialValues.job_status.value, 10)
                  : null
              }
              defaultText={
                initialValues && initialValues.job_status
                  ? initialValues.job_status.name
                  : null
              }
              renderComboBox={({ handleOnChange, ...rest }) => (
                <ComboBoxTaxonomy
                  onChange={handleOnChange}
                  type={TaxonomyType.Job_Status}
                  {...rest}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            name={['metadata', 'employee']}
            label={t('jobStatus.label.employee')}
            rules={[
              {
                required: true,
                message: useTranslate('validator.required', {
                  field: 'jobStatus.label.employee',
                }),
              },
            ]}
          >
            <TextEditable
              defaultValue={
                initialValues && initialValues.employee
                  ? parseInt(initialValues.employee.value, 10)
                  : null
              }
              defaultText={
                initialValues && initialValues.employee
                  ? initialValues.employee.name
                  : null
              }
              renderComboBox={({ handleOnChange, ...rest }) => (
                <ComboBox
                  onChange={handleOnChange}
                  textField="name"
                  valueField="id"
                  labelInValue
                  type={ComboBoxType.Employee}
                  width="200"
                  {...rest}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            name={['metadata', 'leader']}
            label={t('jobStatus.label.leader')}
            rules={[
              {
                required: true,
                message: useTranslate('validator.required', {
                  field: 'jobStatus.label.leader',
                }),
              },
            ]}
          >
            <TextEditable
              defaultValue={
                initialValues && initialValues.leader
                  ? parseInt(initialValues.leader.value, 10)
                  : null
              }
              defaultText={
                initialValues && initialValues.leader
                  ? initialValues.leader.name
                  : null
              }
              renderComboBox={({ handleOnChange, ...rest }) => (
                <ComboBox
                  onChange={handleOnChange}
                  textField="name"
                  valueField="id"
                  type={ComboBoxType.Employee}
                  width="200"
                  labelInValue
                  {...rest}
                />
              )}
            />
          </Form.Item>

          <Form.Item
            name={['metadata', 'customer']}
            label={t('jobStatus.label.customer')}
            rules={[
              {
                required: true,
                message: useTranslate('validator.required', {
                  field: 'jobStatus.label.customer',
                }),
              },
            ]}
          >
            <TextEditable
              defaultValue={
                initialValues && initialValues.customer // initialValues.customer must be not null
                  ? parseInt(initialValues.customer.value, 10)
                  : null
              }
              defaultText={
                initialValues && initialValues.customer
                  ? initialValues.customer.name
                  : null
              }
              renderComboBox={({ handleOnChange, ...rest }) => (
                <ComboBox
                  onChange={handleOnChange}
                  textField="name"
                  valueField="id"
                  type={ComboBoxType.Customer}
                  width="200"
                  labelInValue
                  {...rest}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            name={['metadata', 'priority']}
            label={t('jobCreateform.label.priority')}
          >
            <ComboBoxTaxonomy type={TaxonomyType.Job_Priority} />
          </Form.Item>
        </Card>
      </Form>
    </>
  );
});

export default JobStatusBox;
