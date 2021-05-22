import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { Form, Button, Card, Input } from 'antd';
import { useIntl } from 'react-intl';
import { formatMoney } from '~/shared/formatHelper';
import TextEditable from '~/components/TextEditable';

// graphql

const JobMoney = forwardRef<any, any>((props, ref) => {
  const { formatMessage } = useIntl();
  const { userId, cost } = props.job;
  const t = (id, values?) => formatMessage({ id }, values);
  const [form] = Form.useForm();

  /// EVENTS
  useImperativeHandle(ref, () => ({
    getFieldsValue,
  }));

  const getFieldsValue = () => form.getFieldsValue();

  // Render
  return (
    <>
      <Form form={form}>
        <Card
          className="mt-4 status-form"
          title={t('jobMoney.title')}
          extra={
            <Form.Item name={['metadata', 'cost']}>
              <TextEditable
                defaultValue={cost}
                defaultText={formatMoney(cost)}
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
            name={['metadata', 'link']}
            className="field-number"
            label={t('jobMoney.label.paid')}
          >
            <Button type="link"> 100,000 VND</Button>
          </Form.Item>
          <Form.Item
            name={['metadata', 'link']}
            className="field-number"
            label={t('jobMoney.label.debt')}
          >
            <Button type="link">70,000 VND</Button>
          </Form.Item>
        </Card>
      </Form>
    </>
  );
});

export default JobMoney;
