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
import React, { forwardRef, useImperativeHandle } from 'react';
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
  const { formatMessage } = useIntl();
  const t = (id, values?) => formatMessage({ id }, values);
  const [form] = Form.useForm();
  const [mutate, result] = metadataFactory(
    EntityType.ProductBase,
  ).upsertMetadata();

  function callback(key) {
    console.log(key);
  }

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
        <Form.List name="attributes">
          {(fields, { add, remove }) => (
            <>
              <div className="mb-4">
                <Select placeholder="Custom Attribute">
                  <Option value="Zhejiang">Size</Option>
                  <Option value="Jiangsu">Color</Option>
                </Select>
                <Button type="primary" className="ml-2" onClick={() => add()}>
                  Add
                </Button>
              </div>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Collapse onChange={callback}>
                  <Panel
                    header="Size"
                    key="1"
                    className="mb-3"
                  >
                    <Row gutter={12}>
                      <Col span="8">
                        <Form.Item
                          {...restField}
                          label="Name"
                          name={[name, 'last']}
                          tooltip="This is a required field"
                          fieldKey={[fieldKey, 'last']}
                          rules={[
                            { required: true, message: 'Missing last name' },
                          ]}
                        >
                          <Input placeholder="Last Name" />
                        </Form.Item>
                      </Col>
                      <Col span="16">
                        <Form.Item
                          {...restField}
                          label="Values"
                          name={[name, 'last']}
                          tooltip="This is a required field"
                          fieldKey={[fieldKey, 'last']}
                          rules={[
                            { required: true, message: 'Missing last name' },
                          ]}
                        >
                          <Input placeholder="Last Name" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Panel>
                </Collapse>
              ))}
            </>
          )}
        </Form.List>
      </Form>
    </>
  );
};

export default forwardRef<any, IProps & React.HTMLAttributes<HTMLDivElement>>(
  AttributeForm,
);
