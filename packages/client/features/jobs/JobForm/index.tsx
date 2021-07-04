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
import JOB_SETTING from '~/constants/jobSettings';
import { smallerThan } from '~/shared/antdHelper';
import moment from 'moment';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { isEmpty } from '~/shared/objectHelper';

interface IProps {
  initialValues?: any;
  layout?: any;
  onFieldChange?: (path: string | string[], value: string) => void;
  onSaveCompleted?: (resp: any) => void;
}

const defaultLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const JobForm = forwardRef<any, IProps & React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    // DECLARES
    const { formatMessage } = useIntl();
    const { initialValues, onSaveCompleted } = props;
    const t = (id, values?) => formatMessage({ id }, values);
    const [upsertJob] = jobService.upsert({ onCompleted: onSaveCompleted }); //(userQueries.UPSERT_USER);
    const [form] = Form.useForm();
    const layout = props.layout || defaultLayout;

    const formSetFields = job => {
      console.log('job', job);

      form.setFields([
        { name: ['job', 'title'], value: job.title },
        { name: ['job', 'code'], value: job.code },
        { name: ['job', 'link'], value: job.link },
        { name: ['job', 'description'], value: job.description },
        { name: ['job', 'publishDate'], value: moment(job.publishDate) },
        { name: ['job', 'dueDate'], value: moment(job.dueDate) },

        // taxonomies
        {
          name: ['taxonomies', 'job_status'],
          value: job.job_status ? parseInt(job.job_status.value, 10) : null,
        },

        // metadata
        { name: ['metadata', 'link'], value: job.link },
        { name: ['metadata', 'isDemoColor'], value: !!job.isDemoColor },
        {
          name: ['metadata', 'isDemoLayout'],
          value: !!job.isDemoLayout,
        },
        { name: ['metadata', 'priority'], value: job.priority },
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
      submit,
      getFieldsValue,
      validateFields,
    }));

    const getFieldsValue = () => form.getFieldsValue();
    const validateFields = () => form.validateFields();
    const submit = () => {
      form
        .validateFields()
        .then(values => {
          const job = initialValues
            ? { id: initialValues.id, ...values.job }
            : values.job;

          const metadata = fieldsToMetadata(values.metadata);

          const taxonomies = !isEmpty(values.taxonomies)
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

    const onTitleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
      if (props.onFieldChange) {
        props.onFieldChange!(
          ['job', 'title'],
          form.getFieldValue(['job', 'title']),
        );
      }
    };

    return (
      <Form
        id="JobForm"
        form={form}
        {...layout}
        initialValues={{
          job: {
            publishDate: moment(),
            dueDate: moment().add(JOB_SETTING.dueDateIncrease, 'day'),
          },
          metadata: {
            isDemoColor: false,
            isDemoLayout: false,
            priority: 4, // Normal
          },
          taxonomies: {},
        }}
        onFinish={submit}
        layout="vertical"
      >
        <Form.Item name={['job', 'code']} label={t('jobCreateform.label.code')}>
          <Input disabled />
        </Form.Item>
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
          <Input onChange={onTitleChange} />
        </Form.Item>

        <Form.Item
          name={['metadata', 'link']}
          label={t('jobCreateform.label.link')}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name={['job', 'publishDate']}
          label={t('jobCreateform.label.publishDate')}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          name={['job', 'dueDate']}
          label={t('jobCreateform.label.dueDate')}
        >
          <DatePicker
            disabledDate={smallerThan(
              form.getFieldValue(['job', 'publishDate']),
            )}
          />
        </Form.Item>

        <Form.Item name={['metadata', 'isDemoColor']} valuePropName="checked">
          <Checkbox>{t('jobCreateform.label.demoColor')}</Checkbox>
        </Form.Item>

        <Form.Item name={['metadata', 'isDemoLayout']} valuePropName="checked">
          <Checkbox>{t('jobCreateform.label.demoLayout')}</Checkbox>
        </Form.Item>

        <Form.Item
          name={['job', 'description']}
          label={t('jobCreateform.label.description')}
        >
          <TextArea />
        </Form.Item>
      </Form>
    );
  },
);

export default JobForm;
