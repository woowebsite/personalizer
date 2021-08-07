import React, { useState } from 'react';
import { Form } from 'antd';
import { useIntl } from 'react-intl';
import CardForm from '~/components/CardForm';
import PrintAreaTable from './PrintAreaTable';
import productBaseService from '~/services/productBaseService';
import AddPrintAreaForm from './AddPrintAreaForm';
import metadataFactory from '~/services/metadataService';
import EntityType from '~/constants/EntityType';
import TaxonomyType from '~/constants/TaxonomyType';

interface IProps {
  initialValues: any;
}

const formRender = props => <AddPrintAreaForm {...props} />;

const ProductBaseCombinePrintArea = (props: IProps) => {
  const { id } = props.initialValues;
  const { formatMessage } = useIntl();
  const t = (id, values?) => formatMessage({ id }, values);
  const [isShowForm, showForm] = useState(false);
  const [form] = Form.useForm();
  const tableRef: any = React.createRef();

  // EVENTS
  const onSaveCompleted = () => {
    tableRef.current.refetch();
  };

  return (
    <>
      <CardForm
        title={t('combinePrintAreaBox.title')}
        className="mt-4"
        mutation={metadataFactory(EntityType.ProductBase).upsertMetadata}
        formRender={formRender}
        entityType={EntityType.ProductBase}
        entityId={id}
        taxonomyType={TaxonomyType.ProductBase_CombinePrintArea}
        onSaveCompleted={onSaveCompleted}
      >
        <PrintAreaTable entityId={id} ref={tableRef} />
      </CardForm>
    </>
  );
};

export default ProductBaseCombinePrintArea;
