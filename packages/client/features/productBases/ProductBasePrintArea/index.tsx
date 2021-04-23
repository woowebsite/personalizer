import React, { useState } from 'react';
import { Form } from 'antd';
import { useIntl } from 'react-intl';
import CardForm from '~/components/CardForm';
import PrintAreaTable from './PrintAreaTable';
import productBaseService from '~/services/productBaseService';
import AddPrintAreaForm from './AddPrintAreaForm';

const formRender = props => <AddPrintAreaForm {...props} />;

const ProductBasePrintArea = () => {
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
        title={t('printAreaBox.title')}
      >
        <PrintAreaTable />
      </CardForm>
    </>
  );
};

export default ProductBasePrintArea;
