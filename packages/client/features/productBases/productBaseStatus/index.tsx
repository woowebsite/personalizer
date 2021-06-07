import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { Form, Button, Select, Typography, DatePicker } from 'antd';
import { useIntl } from 'react-intl';
import Card from 'components/Card';
import ComboBoxEnum from '~/components/ComboBoxEnum';
import TextEditable from '~/components/TextEditable';
import { enumToDitionary } from '~/shared/enumHelper';
import ProductBaseStatus from '../constants/ProductBaseStatus';
import ProductBaseVisibility from '../constants/ProductBaseVisibility';

const ProductBaseStatusBox = forwardRef<any, any>((props, ref) => {
  const { formatMessage } = useIntl();
  const { initialValues, userId } = props;
  const t = (id, values?) => formatMessage({ id }, values);
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    getFieldsValue,
    validateFields,
  }));

  const getFieldsValue = () => form.getFieldsValue();
  const validateFields = () => form.validateFields();

  // EFFECT
  useEffect(
    () => {
      if (initialValues) {
        formSetFields(initialValues);
      }
    },
    [initialValues],
  );

  const formSetFields = pb => {
    form.setFields([
      // product base
      {
        name: ['productBase', 'status'],
        value: pb.status,
      },
      {
        name: ['productBase', 'visibility'],
        value: pb.visibility,
      },
      {
        name: ['productBase', 'publishDate'],
        value: pb.publishDate,
      },
    ]);
  };

  return (
    <>
      <Card title={t('publishBox.title')}>
        <Form
          form={form}
          size="small"
          initialValues={{
            metadata: {
              status: ProductBaseStatus.Draft.toString(),
            },
          }}
          className="status-form"
        >
          <Form.Item
            name={['productBase', 'status']}
            label={t('publishBox.label.status')}
          >
            <TextEditable
              defaultValue={enumToDitionary(ProductBaseStatus)[0].id}
              defaultText={enumToDitionary(ProductBaseStatus)[0].name}
              renderComboBox={({ handleOnChange, ...rest }) => (
                <ComboBoxEnum
                  {...rest}
                  onChange={handleOnChange}
                  type={ProductBaseStatus}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            name={['productBase', 'visibility']}
            label={t('publishBox.label.visibility')}
          >
            <TextEditable
              defaultValue={enumToDitionary(ProductBaseVisibility)[0].id}
              defaultText={enumToDitionary(ProductBaseVisibility)[0].name}
              renderComboBox={({ handleOnChange, ...rest }) => (
                <ComboBoxEnum
                  {...rest}
                  onChange={handleOnChange}
                  type={ProductBaseVisibility}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            name={['productBase', 'publishDate']}
            label={t('publishBox.label.publish')}
          >
            <DatePicker />
          </Form.Item>
        </Form>
      </Card>
    </>
  );
});

export default ProductBaseStatusBox;
