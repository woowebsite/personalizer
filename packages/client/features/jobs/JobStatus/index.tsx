import React, { useEffect, forwardRef, useImperativeHandle } from 'react';
import { Form, Button } from 'antd';
import { useIntl } from 'react-intl';

// graphql
import TextEditable from '~/components/TextEditable';
import ComboBoxTaxonomy, { TaxonomyType } from '~/components/ComboBoxTaxonomy';
import ComboBox, { ComboBoxType } from '~/components/ComboBox';
import jobService from '~/services/jobService';
import { fieldsToMetadata } from '~/shared/metadataHelper';

// utils
const JobStatus = forwardRef<any, any>((props, ref) => {
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
        value: job.job_status.value,
      },
      {
        name: ['metadata', 'employee_id'],
        value: JSON.parse(job.employee_id).value,
      },

      // metadata
      {
        name: ['metadata', 'leader_id'],
        value: JSON.parse(job.leader_id).value,
      },
    ]);
  };

  /// EVENTS
  useImperativeHandle(ref, () => ({
    onSubmit,
    getFieldsValue,
  }));

  const getFieldsValue = () => form.getFieldsValue();
  const onSubmit = () => {
    form
      .validateFields()
      .then(values => {
        const job = initialValues
          ? { id: initialValues.id, ...values.job }
          : values.job;

        const metadata = fieldsToMetadata(values.metadata);
        const taxonomies = values.taxonomies
          ? Object.values(values.taxonomies)
          : [];

        upsertJob({
          variables: { job, metadata, taxonomies },
        });
      })
      .catch(errorInfo => {
        console.log('Error: ', errorInfo);
      });
  };

  return (
    <>
      <Form form={form} size="small" onFinish={onSubmit}>
        <Form.Item
          name={['taxonomies', 'job_status']}
          label={t('jobStatus.label.status')}
        >
          <TextEditable
            defaultValue={
              initialValues
                ? parseInt(initialValues.job_status.value, 10)
                : null
            }
            defaultText={initialValues ? initialValues.job_status.name : null}
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
          name={['metadata', 'employee_id']}
          label={t('jobStatus.label.employee')}
        >
          <TextEditable
            defaultValue={
              initialValues ? JSON.parse(initialValues.employee_id) : null
            }
            defaultText={
              initialValues ? JSON.parse(initialValues.employee_id).label : null
            }
            renderComponent={({ handleOnChange, ...rest }) => (
              <ComboBox
                onChange={handleOnChange}
                textField="name"
                valueField="id"
                labelInValue
                type={ComboBoxType.User}
                width="200"
                {...rest}
              />
            )}
          />
        </Form.Item>
        <Form.Item
          name={['metadata', 'leader_id']}
          label={t('jobStatus.label.leader')}
        >
          <TextEditable
            defaultValue={
              initialValues ? JSON.parse(initialValues.leader_id) : null
            }
            defaultText={
              initialValues ? JSON.parse(initialValues.leader_id).label : null
            }
            renderComponent={({ handleOnChange, ...rest }) => (
              <ComboBox
                onChange={handleOnChange}
                textField="name"
                valueField="id"
                type={ComboBoxType.User}
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

export default JobStatus;
