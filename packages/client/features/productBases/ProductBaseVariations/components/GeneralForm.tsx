import { Form, Input, InputNumber, Select } from 'antd';
import { useIntl } from 'react-intl';
import React from 'react';
import useTranslate from '~/hooks/useTranslate';
interface IProps {}

const { Option } = Select;

const GeneralForm = (props: IProps) => {
  // DECLARES
  const { formatMessage } = useIntl();
  const t = (id, values?) => formatMessage({ id }, values);
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 24 }}
      labelAlign="left"
    >
      <Form.Item
        name={['metadata', 'sku']}
        rules={[
          {
            required: true,
            message: useTranslate('validator.required', {
              field: 'productBaseVariation.tabs.general.label.sku',
            }),
          },
        ]}
        label={t('productBaseVariation.tabs.general.label.sku')}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={['metadata', 'basePrice']}
        label={t('productBaseVariation.tabs.general.label.basePrice')}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        name={['metadata', 'retailPrice']}
        label={t('productBaseVariation.tabs.general.label.retailPrice')}
      >
        <InputNumber className="mb-2" />
        <Input.Group compact>
          <Select defaultValue="Zhejiang">
            <Option value="Zhejiang">Zhejiang</Option>
            <Option value="Jiangsu">Jiangsu</Option>
          </Select>
          <Input
            style={{ width: '50%' }}
            defaultValue="Xihu District, Hangzhou"
          />
        </Input.Group>
      </Form.Item>

      <Form.Item label={t('productBaseVariation.tabs.general.label.quantity')}>
        <InputNumber />
      </Form.Item>
    </Form>
  );
};

export default GeneralForm;
