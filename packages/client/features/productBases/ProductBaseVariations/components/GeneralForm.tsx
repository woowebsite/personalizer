import { Form, Input, InputNumber, Select } from 'antd';
import { useIntl } from 'react-intl';
import React, { forwardRef, useImperativeHandle } from 'react';
import useTranslate from '~/hooks/useTranslate';
import metadataFactory from '~/services/metadataService';
import EntityType from '~/constants/EntityType';
import TaxonomyType from '~/constants/TaxonomyType';
import { fieldsToMetadata } from '~/shared/metadataHelper';
interface IProps {
  initialValues: any;
}

const { Option } = Select;

const GeneralForm = (props: IProps, ref) => {
  // DECLARES
  const { entityId } = props.initialValues;
  const { formatMessage } = useIntl();
  const t = (id, values?) => formatMessage({ id }, values);
  const [form] = Form.useForm();
  const [mutate, result] = metadataFactory(
    EntityType.ProductBase,
  ).upsertMetadata();

  const save = () => {
    form
      .validateFields()
      .then(values => {
        const term = { name: 'General' };
        const termMeta = fieldsToMetadata(values.metadata);
        mutate({
          variables: {
            entityId,
            entityType: EntityType.ProductBase,
            taxonomy: TaxonomyType.ProductBase_Data,
            termMeta,
            term,
          },
        });
      })
      .catch(errorInfo => {
        console.log('Error: ', errorInfo);
      });
  };

  /// METHODS
  useImperativeHandle(ref, () => ({
    save,
  }));

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

export default forwardRef<any, IProps & React.HTMLAttributes<HTMLDivElement>>(
  GeneralForm,
);
