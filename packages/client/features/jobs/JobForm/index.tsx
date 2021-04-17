import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { Modal, Form, DatePicker, Input, Button, Upload, message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useIntl } from 'react-intl';

// components
import UploadImage from '~/components/UploadImage';
import ComboBox from '~/components/ComboBox';
import ComboBoxType from '~/components/ComboBox/ComboBoxType';
import useTranslate from 'hooks/useTranslate';

// graphql
import jobService from 'services/jobService';
import ComboBoxEnum from '~/components/ComboBoxEnum';
import CustomerType from '~/models/CustomerType';

// utils
import { fieldsToMetadata } from '~/shared/metadataHelper';
import ComboBoxTaxonomy, { TaxonomyType } from '~/components/ComboBoxTaxonomy';

interface IProps {
  initialValues?: any;
}
const JobForm = forwardRef<any, IProps>((props, ref) => {
  // DECLARES
  const { formatMessage } = useIntl();
  const { initialValues } = props;
  const t = (id, values?) => formatMessage({ id }, values);
  const [upsertJob] = jobService.upsert(); //(userQueries.UPSERT_USER);
  const [form] = Form.useForm();

  const formSetFields = job => {
    form.setFields([
      { name: 'title', value: job.title },
      { name: 'link', value: job.link },
      { name: 'description', value: job.description },
      { name: 'dueDate', value: job.image },
    ]);
  };

  // EFFECT
  useEffect(
    () => {
      if (initialValues) {
        formSetFields(initialValues);
      }
    },
    [initialValues],
  );

  /// EVENTS
  useImperativeHandle(ref, () => ({
    onSubmit,
  }));

  const onSubmit = () => {
    form
      .validateFields()
      .then(values => {
        const job = initialValues
          ? { id: initialValues.id, ...values.job }
          : values.job;

        const metadata = fieldsToMetadata(values.metadata);

        upsertJob({
          variables: { job, metadata },
        });
      })
      .catch(errorInfo => {
        console.log('Error: ', errorInfo);
      });
  };

  const onSetImageUrl = filename => {
    form.setFieldsValue({ image: filename });
  };

  return (
    <Form
      id="JobForm"
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onSubmit}
      layout="vertical"
    >
      <Form.Item
        name={['job', 'title']}
        rules={[
          {
            required: true,
            message: useTranslate('validator.required', {
              field: 'jobCreateform.label.title',
            }),
          },
        ]}
        label={t('jobCreateform.label.title')}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={['metadata', 'link']}
        label={t('jobCreateform.label.link')}
      >
        <Input type="link" />
      </Form.Item>

      <Form.Item
        name={['taxonomies', 'job_priority']}
        label={t('jobCreateform.label.priority')}
      >
        <ComboBoxTaxonomy type={TaxonomyType.Job_Priority} />
      </Form.Item>

      <Form.Item
        name={['job', 'dueDate']}
        label={t('jobCreateform.label.dueDate')}
      >
        <DatePicker  />
      </Form.Item>

      <Form.Item
        name={['job', 'description']}
        label={t('jobCreateform.label.description')}
      >
        <TextArea />
      </Form.Item>

     
    </Form>
  );
});

export default JobForm;
