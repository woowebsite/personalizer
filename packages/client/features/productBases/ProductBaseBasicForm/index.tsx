import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { Modal, Form, Input, Button, Upload, message } from 'antd';
import { useIntl } from 'react-intl';

// components
import UploadImage from '~/components/UploadImage';
import ComboBox from '~/components/ComboBox';
import ComboBoxType from '~/components/ComboBox/ComboBoxType';
import useTranslate from 'hooks/useTranslate';

// graphql
import productBaseService from 'services/productBaseService';
import ComboBoxTaxonomy from '~/components/ComboBoxTaxonomy';
import ComboBoxEnum from '~/components/ComboBoxEnum';
import ProviderEnum from '~/models/ProviderEnum';
import ProductBaseTaxonomy from '../constants/ProductBaseTaxonomy';

interface IProps {
  data?: any;
  onFieldChange?: (path: string | string[], value: string) => void;
}
const ProductBaseBasicForm = forwardRef<any, IProps>((props, ref) => {
  // DECLARES
  const { formatMessage } = useIntl();
  const { data } = props;
  const t = (id, values?) => formatMessage({ id }, values);
  const [upsertProductBase] = productBaseService.upsert();
  const [form] = Form.useForm();

  const formSetFields = productBase => {
    form.setFields([
      { name: ['productBase', 'title'], value: productBase.title },
      { name: ['productBase', 'description'], value: productBase.description },
      { name: ['productBase', 'providerId'], value: productBase.providerId },

      // taxonomies
      {
        name: ['taxonomies', ProductBaseTaxonomy.ProductBase_Category],
        value: productBase[ProductBaseTaxonomy.ProductBase_Category]
          ? parseInt(
              productBase[ProductBaseTaxonomy.ProductBase_Category].value,
              10,
            )
          : null,
      },
      {
        name: ['taxonomies', ProductBaseTaxonomy.ProductBase_Tag],
        value: productBase[ProductBaseTaxonomy.ProductBase_Tag]
          ? parseInt(productBase[ProductBaseTaxonomy.ProductBase_Tag].value, 10)
          : null,
      },

      // metadata
      { name: ['metadata', 'printArea'], value: productBase.printArea },
    ]);
  };

  // EFFECT
  useEffect(
    () => {
      if (data) {
        formSetFields(data);
      }
    },
    [data],
  );

  /// EVENTS
  useImperativeHandle(ref, () => ({
    onSubmit,
    getFieldsValue,
    validateFields,
  }));

  const getFieldsValue = () => form.getFieldsValue();
  const validateFields = () => form.validateFields();

  const onSubmit = () => {
    form
      .validateFields()
      .then(values => {
        const taxonomies = values.taxonomies
          ? Object.values(values.taxonomies)
          : [];
        const productBase = data ? { id: data.id, ...values } : values;
        upsertProductBase({
          variables: {
            productBase: { ...productBase, taxonomies },
          },
        });
      })
      .catch(errorInfo => {
        console.log('Error: ', errorInfo);
      });
  };

  const onSetImageUrl = filename => {
    form.setFieldsValue({ image: filename });
  };

  const onTitleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    props.onFieldChange(
      ['productBase', 'title'],
      form.getFieldValue(['productBase', 'title']),
    );
  };

  return (
    <Form
      id="ProductBaseBasicForm"
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 24 }}
      onFinish={onSubmit}
      layout="vertical"
    >
      {JSON.stringify(data)}
      <Form.Item
        name={['productBase', 'title']}
        rules={[
          {
            required: true,
            message: useTranslate('validator.required', {
              field: 'productBaseBasicForm.label.title',
            }),
          },
        ]}
        label={t('productBaseBasicForm.label.title')}
      >
        <Input onChange={onTitleChange} />
      </Form.Item>

      <Form.Item
        name={['productBase', 'description']}
        label={t('productBaseBasicForm.label.description')}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        name={['productBase', 'providerId']}
        label={t('productBaseBasicForm.label.provider')}
      >
        <ComboBoxEnum type={ProviderEnum} />
      </Form.Item>

      <Form.Item
        name={['productBase', 'thumbnails']}
        label={t('productBaseBasicForm.label.thumbnails')}
      >
        <UploadImage setImageUrl={onSetImageUrl} />
      </Form.Item>

      <Form.Item
        name={['taxonomies', ProductBaseTaxonomy.ProductBase_Category]}
        label={t('productBaseBasicForm.label.categories')}
      >
        <ComboBoxTaxonomy type={ProductBaseTaxonomy.ProductBase_Category} />
      </Form.Item>

      <Form.Item
        name={['taxonomies', ProductBaseTaxonomy.ProductBase_Tag]}
        label={t('productBaseBasicForm.label.tags')}
      >
        <ComboBoxTaxonomy type={ProductBaseTaxonomy.ProductBase_Tag} />
      </Form.Item>
    </Form>
  );
});

export default ProductBaseBasicForm;
