import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { Form, Button, Card, Input } from 'antd';
import { useIntl } from 'react-intl';
import { formatMoney } from '~/shared/formatHelper';
import TextEditable from '~/components/TextEditable';
import useTranslate from 'hooks/useTranslate';
// graphql

const JobMoney = forwardRef<any, any>((props, ref) => {
  const { formatMessage } = useIntl();
  const { job } = props;
  const t = (id, values?) => formatMessage({ id }, values);
  const [form] = Form.useForm();
  const initialValues = {
    cost: job ? job.cost : 0,
  };

  /// EVENTS
  useImperativeHandle(ref, () => ({
    getFieldsValue,
    validateFields
  }));

  const getFieldsValue = () => form.getFieldsValue();
  const validateFields = () => form.validateFields();

  // Render
  return (
    <>
      <Form form={form}>
        <Card
          className="mt-4 status-form card-required-title"
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
                renderComponent={({ handleOnChange, ref, ...rest }) => {
                  return (
                    <Input
                      ref={ref}
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
            // name={['metadata', 'paid']}
            className="field-number"
            label={t('jobMoney.label.paid')}
          >
            <Button type="link"> {formatMoney(100000)}</Button>
          </Form.Item>
          <Form.Item
            // name={['metadata', 'debt']}
            className="field-number"
            label={t('jobMoney.label.debt')}
          >
            <Button type="link">{formatMoney(70000)}</Button>
          </Form.Item>
        </Card>
      </Form>
    </>
  );
});

export default JobMoney;
