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
    submit
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
        const taxonomies = taxonomyFields ? Object.values(taxonomyFields) : [];

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
      <Form form={form}>
        <Card
          className="mb-4 status-form card-required-title"
          title={t('jobMoney.title')}
          extra={
            <Form.Item
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
                defaultValue={initialValues.cost}
                defaultText={formatMoney(initialValues.cost)}
                renderInput={({ handleOnChange, ref, ...rest }) => {
                  return (
                    <Input
                      ref={ref}
                      onPressEnter={onFieldBlur}
                      onChange={e =>
                        handleOnChange(
                          e.target.value,
                          formatMoney(e.target.value),
                        )
                      }
                      style={{ width: '150px', textAlign: 'right' }}
                      {...rest}
                    />
                  );
                }}
              />
            </Form.Item>
          }
          actions={[
            <Button type="primary" size="small">
              {t('buttons.payment')}
            </Button>,
          ]}
        >
          <Form.Item
            name={['metadata', 'paid']}
            className="field-number"
            label={t('jobMoney.label.paid')}
          >
            <TextEditable
              defaultValue={initialValues.paid}
              defaultText={formatMoney(initialValues.paid)}
              renderInput={({ handleOnChange, ref, ...rest }) => {
                return (
                  <Input
                    ref={ref}
                    onPressEnter={onFieldBlur}
                    onChange={e =>
                      handleOnChange(
                        e.target.value,
                        formatMoney(e.target.value),
                      )
                    }
                    style={{ width: '150px', textAlign: 'right' }}
                    {...rest}
                  />
                );
              }}
            />
          </Form.Item>
          <Form.Item
            className="field-number"
            label={t('jobMoney.label.debt')}
          >
            <span className="text-danger">{formatMoney(dept)}</span>
          </Form.Item>
        </Card>
      </Form>
    </>
  );
});

export default JobMoney;
