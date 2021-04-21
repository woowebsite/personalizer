import React from 'react';
import { Form, Button, Select, Typography } from 'antd';
import { useIntl } from 'react-intl';
import Card from 'components/Card';
import ComboBoxEnum from '~/components/ComboBoxEnum';
import ProductBaseStatus from '~/models/ProductBaseStatus';
import ProductBaseVisibility from '~/models/ProductBaseVisibility';
import TextEditable from '~/components/TextEditable';
import { enumToDitionary } from '~/shared/enumHelper';

const ProductBaseStatusBox = props => {
  const { formatMessage } = useIntl();
  const { userId } = props;
  const t = (id, values?) => formatMessage({ id }, values);
  const [form] = Form.useForm();

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
            name={['metadata', 'status']}
            label={t('publishBox.label.status')}
          >
            <TextEditable
              defaultValue={enumToDitionary(ProductBaseStatus)[0].id}
              defaultText={enumToDitionary(ProductBaseStatus)[0].name}
              renderComponent={props => (
                <ComboBoxEnum
                  type={ProductBaseStatus}
                  onChange={props.handleOnChange}
                  {...props}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            name={['metadata', 'visibility']}
            label={t('publishBox.label.visibility')}
          >
            <TextEditable
              defaultValue={enumToDitionary(ProductBaseVisibility)[0].id}
              defaultText={enumToDitionary(ProductBaseVisibility)[0].name}
              renderComponent={props => (
                <ComboBoxEnum
                  type={ProductBaseVisibility}
                  onChange={props.handleOnChange}
                  {...props}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            name={['metadata', 'publish']}
            label={t('publishBox.label.publish')}
          >
            <TextEditable
              defaultValue={enumToDitionary(ProductBaseStatus)[0].id}
              defaultText={enumToDitionary(ProductBaseStatus)[0].name}
              renderComponent={props => (
                <ComboBoxEnum
                  type={ProductBaseStatus}
                  onChange={props.handleOnChange}
                  {...props}
                />
              )}
            />
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default ProductBaseStatusBox;
