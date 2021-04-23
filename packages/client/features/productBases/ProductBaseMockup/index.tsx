import React, { useState } from 'react';
import { Form } from 'antd';
import { useIntl } from 'react-intl';
import CardForm from '~/components/CardForm';
import MockupTable from './MockupTable';
import productBaseService from '~/services/productBaseService';
import MockupForm from './MockupForm';

const formRender = props => <MockupForm {...props} />;

const ProductBaseMockup = () => {
  const { formatMessage } = useIntl();
  const t = (id, values?) => formatMessage({ id }, values);
  const [isShowForm, showForm] = useState(false);
  const [form] = Form.useForm();

  return (
    <>
      <CardForm
        className="mt-4"
        mutation={productBaseService.upsert}
        formRender={formRender}
        title={t('mockupBox.title')}
      >
        <MockupTable />
      </CardForm>
    </>
  );
};

export default ProductBaseMockup;
