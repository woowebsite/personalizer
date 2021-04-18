import React from 'react';
import { Form, Button } from 'antd';
import { useIntl } from 'react-intl';

// graphql

const JobMoney = props => {
  const { formatMessage } = useIntl();
  const { userId } = props;
  const t = (id, values?) => formatMessage({ id }, values);

  return (
    <>
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
    </>
  );
};

export default JobMoney;
