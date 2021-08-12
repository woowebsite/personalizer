import {
  Button,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Collapse,
  Col,
} from 'antd';
import { useIntl } from 'react-intl';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import useTranslate from '~/hooks/useTranslate';
import metadataFactory from '~/services/metadataService';
import EntityType from '~/constants/EntityType';
import { fieldsToMetadata } from '~/shared/metadataHelper';
import TaxonomyType from '~/constants/TaxonomyType';

interface IProps {
  initialValues: any;
}

const { Option } = Select;
const { Panel } = Collapse;

const VariationForm = (props: IProps, ref) => {
  // DECLARES
  const { entityId } = props.initialValues;
  const [selectedAttribute, setAttribute] = useState<any>();
  const [fields, setFields] = useState<any>([]);
  const { formatMessage } = useIntl();
  const t = (id, values?) => formatMessage({ id }, values);
  const [form] = Form.useForm();
  const [mutate, result] = metadataFactory(
    EntityType.ProductBase,
  ).upsertMetadata();

  const add = () => {
    setFields(prev => [...prev, selectedAttribute]);
  };

  const handleAttributeMouseEnter = e => {
    e.stopPropagation();
    e.preventDefault();
  };

  // METHODS
  const save = () => {
    form
      .validateFields()
      .then(values => {
        const term = { name: 'Attributes' };
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

  useImperativeHandle(ref, () => ({
    save,
  }));

  return (
    <>
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        labelAlign="left"
      >
        <div className="mb-4">
          <Select
            placeholder="No default size"
            onChange={value => setAttribute(value)}
            labelInValue
            allowClear
            style={{ width: 170 }}
            className="mr-2"
          >
            <Option value="size">Size</Option>
            <Option value="color">Color</Option>
          </Select>
          <Select
            placeholder="No default color"
            onChange={value => setAttribute(value)}
            labelInValue
            allowClear
            style={{ width: 170 }}
          >
            <Option value="size">Size</Option>
            <Option value="color">Color</Option>
          </Select>
        </div>
        <div className="mb-4">
          <Select
            placeholder="Add Variation"
            onChange={value => setAttribute(value)}
            labelInValue
            allowClear
            style={{ width: 170 }}
          >
            <Option value="size">Size</Option>
            <Option value="color">Color</Option>
          </Select>
          <Button type="primary" className="ml-2" onClick={() => add()}>
            Add
          </Button>
        </div>

        {fields.map(field => (
          <Collapse>
            <Panel
              header={
                <div>
                  <Select
                    className="mr-2"
                    placeholder="Any Size"
                    onClick={handleAttributeMouseEnter}
                    labelInValue
                    allowClear
                    style={{ width: 100 }}
                  >
                    <Option value="size">Size</Option>
                    <Option value="color">Color</Option>
                  </Select>
                  <Select
                    placeholder="Any Color"
                    onClick={handleAttributeMouseEnter}
                    labelInValue
                    allowClear
                    style={{ width: 100 }}
                  >
                    <Option value="size">Size</Option>
                    <Option value="color">Color</Option>
                  </Select>
                </div>
              }
              key="1"
              className="mb-3"
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

              <Form.Item
                label={t('productBaseVariation.tabs.general.label.quantity')}
              >
                <InputNumber />
              </Form.Item>
            </Panel>
          </Collapse>
        ))}
      </Form>
    </>
  );
};

export default forwardRef<any, IProps & React.HTMLAttributes<HTMLDivElement>>(
  VariationForm,
);
