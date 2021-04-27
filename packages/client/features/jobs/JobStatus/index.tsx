import React, { useEffect } from 'react';
import { Form, Button } from 'antd';
import { useIntl } from 'react-intl';

// graphql
import TextEditable from '~/components/TextEditable';
import ComboBoxTaxonomy, { TaxonomyType } from '~/components/ComboBoxTaxonomy';

// utils
const JobStatus = props => {
  const { formatMessage } = useIntl();
  const { initialValues } = props;
  const { userId } = props;
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
      { name: ['taxonomies', 'job_priority'], value: job.job_priority.value },
      { name: ['taxonomies', 'job_status'], value: job.job_status.value },

      // metadata
      { name: ['metadata', 'link'], value: job.link },
    ]);
  };

  return (
    <>
      <Form form={form} size="small">
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
          name={['metadata', 'link']}
          label={t('jobStatus.label.employee')}
        >
          <Button type="link"> Mai Bảo Anh </Button>
        </Form.Item>
        <Form.Item
          name={['metadata', 'link']}
          label={t('jobStatus.label.leader')}
        >
          <Button type="link"> Lăng Tuấn Anh</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default JobStatus;
