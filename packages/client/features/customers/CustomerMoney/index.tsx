import React from 'react';
import { Form, Button, Card, Input, InputNumber, Row } from 'antd';
import { useIntl } from 'react-intl';

// graphql

const CustomerMoney = props => {
  const { formatMessage } = useIntl();
  const { userId } = props;
  const t = (id, values?) => formatMessage({ id }, values);

  const InlineForm = () => (
    <Form layout="inline" size="small" style={{ justifyContent: 'flex-end' }}>
      <Form.Item name={['metadata', 'link']}>
        <InputNumber width="200" />
      </Form.Item>
      <Form.Item className="mr-0" >
        <Button type="primary" size="small">
          {t('customerMoney.buttons.addMoney')}
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <>
      <Card
        className="status-form"
        actions={[<InlineForm />]}
        title={t('customerMoney.title')}
      >
        <Form className="status-form" size="small">
          <Form.Item
            className="field-number"
            name={['metadata', 'link']}
            label={t('customerMoney.label.money')}
          >
            <Button type="link"> 100,000 VND</Button>
          </Form.Item>
          <Form.Item
            className="field-number"
            name={['metadata', 'link']}
            label={t('customerMoney.label.debt')}
          >
            <Button type="link">70,000 VND</Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default CustomerMoney;
