import { Form, Input, Select, Button } from 'antd';
import { useIntl } from 'react-intl';
import React from 'react';
import CustomerType from '~/models/CustomerType';
import ComboBoxEnum from 'components/ComboBoxEnum';

const FilterForm = ({ values, onFilter }) => {
  // DEFINE
  const [form] = Form.useForm();
  const { formatMessage } = useIntl();
  const t = (id, values?) => formatMessage({ id }, values);

  // EVENTS
  const handleFinish = () => {
    form
      .validateFields()
      .then(values => {
        let queries = values;
        if (values.name || !!!values.name) queries.name = `%${values.name}%`;
        onFilter(queries);
      })
      .catch(errorInfo => {
        console.log('Error: ', errorInfo);
      });
  };

  return (
    <Form
      initialValues={values}
      onFinish={handleFinish}
      layout="inline"
      name="basic"
      form={form}
      labelAlign="left"
    >
      <Form.Item name="name">
        <Input allowClear placeholder={t('customerTable.filter.type')} />
      </Form.Item>

      <Form.Item name="customerType">
        <ComboBoxEnum
          type={CustomerType}
          placeholder={t('customerTable.filter.type')}
          width={150}
          allowClear
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {t('buttons.filter')}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FilterForm;
