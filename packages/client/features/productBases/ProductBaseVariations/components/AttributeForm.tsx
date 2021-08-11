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

const AttributeForm = (props: IProps, ref) => {
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
        layout="vertical"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        labelAlign="left"
      >
        <div className="mb-4">
          <Select
            placeholder="Custom Attribute"
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
            <Panel header={field.label} key="1" className="mb-3">
              <Row gutter={12}>
                <Col span="8">
                  <Form.Item
                    label="Name"
                    name={[field.value, 'name']}
                    tooltip="This is a required field"
                    rules={[{ required: true, message: 'Missing field name' }]}
                  >
                    <Input placeholder="Name" />
                  </Form.Item>
                </Col>
                <Col span="16">
                  <Form.Item
                    label="Values"
                    name={[field.value, 'values']}
                    tooltip="This is a required field"
                    rules={[
                      { required: true, message: 'Missing field values' },
                    ]}
                  >
                    <Input placeholder="Values" />
                  </Form.Item>
                </Col>
              </Row>
            </Panel>
          </Collapse>
        ))}
      </Form>
    </>
  );
};

export default forwardRef<any, IProps & React.HTMLAttributes<HTMLDivElement>>(
  AttributeForm,
);
