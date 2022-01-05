import { Form, Input, Select, Button } from 'antd';
import { useIntl } from 'react-intl';
import React from 'react';

// components
import ComboBox, { ComboBoxType } from '~/components/ComboBox';

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
      layout="inline"
      onFinish={handleFinish}
      name="basic"
      form={form}
      labelAlign="left"
    >
      <Form.Item name="customerType">
        <ComboBox
          type={ComboBoxType.Role}
          valueField="id"
          textField="name"
          style={{ width: 150 }}
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
