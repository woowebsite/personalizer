import React, { useState } from 'react';
import { Form } from 'antd';
import { useIntl } from 'react-intl';
import CardForm from '~/components/CardForm';
import PrintAreaTable from './PrintAreaTable';
import metadataFactory from '~/services/metadataService';
import AddPrintAreaForm from './AddPrintAreaForm';
import EntityType from '~/constants/EntityType';
import TaxonomyType from '~/constants/TaxonomyType';

interface IProps {
  initialValues: any;
}

const formRender = props => <AddPrintAreaForm {...props} />;

const ProductBasePrintArea = (props: IProps) => {
  const { id } = props.initialValues;
  const { formatMessage } = useIntl();
  const t = (id, values?) => formatMessage({ id }, values);
  const [isShowForm, showForm] = useState(false);
  const [form] = Form.useForm();
  const tableRef: any = React.createRef();

  const onSaveCompleted = () => {
    tableRef.current.refetch();
  };

  return (
    <>
      <CardForm
        className="mt-4"
        entityId={id}
        entityType={EntityType.ProductBase}
        taxonomyType={TaxonomyType.ProductBase_PrintArea}
        formRender={formRender}
        mutation={metadataFactory(EntityType.ProductBase).upsertMetadata}
        onSaveCompleted={onSaveCompleted}
        title={t('printAreaBox.title')}
      >
        <PrintAreaTable ref={tableRef} entityId={id} />
      </CardForm>
    </>
  );
};

export default ProductBasePrintArea;
