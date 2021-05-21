import React, { useEffect } from 'react';
import { Form, Button, Card, Input } from 'antd';
import { useIntl } from 'react-intl';
import { formatMoney } from '~/shared/formatHelper';
import TextEditable from '~/components/TextEditable';

// graphql

const JobMoney = props => {
  const { formatMessage } = useIntl();
  const { userId, cost } = props.job;
  const t = (id, values?) => formatMessage({ id }, values);

  // Render
  return (
    <>
      <Card
        className="mt-4 status-form"
        title={t('jobMoney.title')}
        extra={
          <TextEditable
            defaultValue={cost}
            defaultText={formatMoney(cost)}
            renderComponent={({ handleOnChange, ref, ...rest }) => {
              return (
                <Input
                  ref={ref}
                  onChange={e =>
                    handleOnChange(e.target.value, formatMoney(e.target.value))
                  }
                  style={{ width: '150px', textAlign: 'right' }}
                  {...rest}
                />
              );
            }}
          />
        }
        actions={[
          <Button type="primary" size="small">
            {t('buttons.payment')}
          </Button>,
        ]}
      >
        <Form className="status-form" size="small">
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
        </Form>
      </Card>
    </>
  );
};

export default JobMoney;
