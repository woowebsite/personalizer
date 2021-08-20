import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { Form, Button, Card, Input } from 'antd';
import { useIntl } from 'react-intl';
import { formatMoney } from '~/shared/formatHelper';
import TextEditable from '~/components/TextEditable';
import useTranslate from 'hooks/useTranslate';
import { fieldsToMetadata } from '~/shared/metadataHelper';

// graphql
import jobService from '~/services/jobService';

const JobMoney = forwardRef<any, any>((props, ref) => {
  const { formatMessage } = useIntl();
  const { initialValues } = props;
  const t = (id, values?) => formatMessage({ id }, values);
  const [upsertJob] = jobService.upsert();
  const [form] = Form.useForm();
  const [dept, setDept] = useState(0);

  // EFFECTS
  useEffect(() => {
    if (initialValues) {
      const cost = parseInt(initialValues.cost);
      const paid = parseInt(initialValues.paid);

      setDept(cost - paid);
    }
  }, []);

  /// EVENTS
  useImperativeHandle(ref, () => ({
    getFieldsValue,
    validateFields,
    submit,
  }));

  const submit = () => {
    const { id, code } = initialValues;
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
          variables: { job: { id, code }, metadata, taxonomies },
        });
      })
      .catch(errorInfo => {
        console.log('Error: ', errorInfo);
      });
  };

  const getFieldsValue = () => form.getFieldsValue();
  const validateFields = () => form.validateFields();

  const updateDept = () => {
    const cost = parseInt(form.getFieldValue(['metadata', 'cost']));
    const paid = parseInt(form.getFieldValue(['metadata', 'paid']));

    setDept(cost - paid);
  };

  const onFieldBlur = () => {
    updateDept();
  };

  // Render
  return (
    <>
      <Form form={form} labelAlign="left">
        <Card className="mb-4 status-form">
          <Form.Item
            label={t('jobMoney.title')}
            name={['metadata', 'cost']}
            rules={[
              {
                required: true,
                message: useTranslate('validator.required', {
                  field: 'jobMoney.label.cost',
                }),
              },
            ]}
          >
            <TextEditable
              style={{ textAlign: 'right' }}
              defaultValue={initialValues.cost}
              defaultText={formatMoney(initialValues.cost || 0)}
              renderInput={({ handleOnChange, ref, ...rest }) => {
                return (
                  <Input
                    ref={ref}
                    onPressEnter={onFieldBlur}
                    onChange={e =>
                      handleOnChange(
                        parseInt(e.target.value),
                        formatMoney(e.target.value || 0),
                      )
                    }
                    style={{ width: '150px', textAlign: 'right' }}
                    {...rest}
                  />
                );
              }}
            />
          </Form.Item>
        </Card>
      </Form>
    </>
  );
});

export default JobMoney;
