import React, { useState } from 'react';
import { Form } from 'antd';
import { useIntl } from 'react-intl';
import CardForm from '~/components/CardForm';
import PrintAreaTable from './PrintAreaTable';
import metadataFactory from '~/services/metadataService';
import AddPrintAreaForm from './AddPrintAreaForm';
import EntityType from '~/constants/EntityType';
import TaxonomyType from '~/constants/TaxonomyType';

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
        entityId={1} // productBaseId
        entityType={EntityType.ProductBase}
        taxonomyType={TaxonomyType.ProductBase_PrintArea}
        formRender={formRender}
        mutation={
          metadataFactory(EntityType.ProductBase).upsertMetadata
        }
        title={t('printAreaBox.title')}
      >
        <PrintAreaTable />
      </CardForm>
    </>
  );
};

export default ProductBasePrintArea;
