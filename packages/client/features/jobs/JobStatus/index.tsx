import React, { useEffect, forwardRef, useImperativeHandle } from 'react';
import { Form, Button } from 'antd';
import { useIntl } from 'react-intl';

// graphql
import TextEditable from '~/components/TextEditable';
import ComboBoxTaxonomy, { TaxonomyType } from '~/components/ComboBoxTaxonomy';
import ComboBox, { ComboBoxType } from '~/components/ComboBox';
import jobService from '~/services/jobService';
import { fieldsToMetadata } from '~/shared/metadataHelper';
import JobStatus from '~/constants/jobStatus';

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
        value: parseInt(job.job_status ? job.job_status.value : JobStatus.Active),
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
    ]);
  };

  /// EVENTS
  useImperativeHandle(ref, () => ({
    // onSubmit,
    getFieldsValue,
  }));

  const getFieldsValue = () => form.getFieldsValue();

  return (
    <>
      <Form form={form} size="small">
        <Form.Item
          name={['taxonomies', 'job_status']}
          label={t('jobStatus.label.status')}
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
            renderComponent={({ handleOnChange, ...rest }) => (
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
        >
          <TextEditable
            defaultValue={
              initialValues && !!JSON.parse(initialValues.employee)
                ? JSON.parse(initialValues.employee)
                : null
            }
            defaultText={
              initialValues && !!JSON.parse(initialValues.employee)
                ? JSON.parse(initialValues.employee).label
                : null
            }
            renderComponent={({ handleOnChange, ...rest }) => (
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
        >
          <TextEditable
            defaultValue={
              initialValues && !!JSON.parse(initialValues.leader)
                ? JSON.parse(initialValues.leader)
                : null
            }
            defaultText={
              initialValues && !!JSON.parse(initialValues.leader)
                ? JSON.parse(initialValues.leader).label
                : null
            }
            renderComponent={({ handleOnChange, ...rest }) => (
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
        >
          <TextEditable
            defaultValue={
              initialValues.customer && !!JSON.parse(initialValues.customer)
                ? JSON.parse(initialValues.customer)
                : null
            }
            defaultText={
              initialValues.customer && !!JSON.parse(initialValues.customer)
                ? JSON.parse(initialValues.customer).label
                : null
            }
            renderComponent={({ handleOnChange, ...rest }) => (
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
      </Form>
    </>
  );
});

export default JobStatusBox;
