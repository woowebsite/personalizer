import React, { forwardRef, useImperativeHandle, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { Form, Input, Button } from 'antd';
import ComboBox, { ComboBoxType } from '~/components/ComboBox';

const FilterForm = forwardRef<any, any>(({ onFilter }, ref) => {
  // DEFINE
  const { formatMessage } = useIntl();
  const t = id => formatMessage({ id });
  const [form] = Form.useForm();

  // EVENTS
  useImperativeHandle(ref, () => ({
    submit: handleFinish,
  }));

  const handleFinish = () => {
    form
      .validateFields()
      .then(values => {
        let queries = values;
        if (typeof values.title !== 'undefined' && values.title.length) {
          queries.title = `%${values.title}%`;
        }
        onFilter(queries);
      })
      .catch(errorInfo => {
        console.log('Error: ', errorInfo);
      });
  };

  return (
    <Form
      form={form}
      layout="inline"
      name="basic"
      labelAlign="left"
      onFinish={handleFinish}
    >
      <Form.Item label={t('filter.labels.employee')} name="employee">
        <ComboBox
          type={ComboBoxType.Employee}
          textField="name"
          valueField="id"
          style={{ width: 150 }}
        />
      </Form.Item>

      <Form.Item label={t('filter.labels.customer')} name="customer">
        <ComboBox
          type={ComboBoxType.Customer}
          textField="name"
          valueField="id"
          style={{ width: 150 }}
        />
      </Form.Item>

      <Form.Item label={t('filter.labels.title')} name="title">
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {t('buttons.filter')}
        </Button>
      </Form.Item>
    </Form>
  );
});

export default FilterForm;
