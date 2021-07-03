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
import { fieldsToMetadata, fieldsToTaxonomies } from '~/shared/metadataHelper';

// utils
const JobStatusBox = forwardRef<any, any>((props, ref) => {
  const { formatMessage } = useIntl();
  const { initialValues } = props;
  const [upsertJob] = jobService.upsert();
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

  const submit = () => {
    const { id } = initialValues;
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
        const taxonomies = fieldsToTaxonomies(taxonomyFields);

        upsertJob({
          variables: { job: { id }, metadata, taxonomies },
        });
      })
      .catch(errorInfo => {
        console.log('Error: ', errorInfo);
      });
  };

  const getFieldsValue = () => form.getFieldsValue();
  const validateFields = () => form.validateFields();

  const job_status = initialValues.job_status;

  const fCustomer = initialValues.metadata.find(x => x.key === 'customer');
  const customer = fCustomer && JSON.parse(fCustomer.data);

  const fLeader = initialValues.metadata.find(x => x.key === 'leader');
  const leader = fLeader && JSON.parse(fLeader.data);

  const fEmployee = initialValues.metadata.find(x => x.key === 'employee');
  const employee = fEmployee && JSON.parse(fEmployee.data);

  const fPriority = initialValues.metadata.find(x => x.key === 'priority');
  const priority = fPriority && JSON.parse(fPriority.data);

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
              defaultValue={job_status && job_status.value}
              defaultText={job_status && job_status.name}
              renderComboBox={({ handleOnChange, ...rest }) => (
                <ComboBoxTaxonomy
                  type={TaxonomyType.Job_Status}
                  labelInValue
                  onChange={handleOnChange}
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
              defaultValue={employee && employee.value}
              defaultText={employee && employee.name}
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
              defaultValue={leader && leader.value}
              defaultText={leader && leader.name}
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
              defaultValue={customer && customer.value}
              defaultText={customer && customer.name}
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
            <TextEditable
              defaultValue={priority && priority.value}
              defaultText={priority && priority.name}
              renderComboBox={({ handleOnChange, ...rest }) => (
                <ComboBoxTaxonomy
                  type={TaxonomyType.Job_Priority}
                  onChange={handleOnChange}
                  textField="name"
                  valueField="id"
                  labelInValue
                  width="200"
                  {...rest}
                />
              )}
            />
          </Form.Item>
        </Card>
      </Form>
    </>
  );
});

export default JobStatusBox;
