import React, { useState } from 'react';
import { Form } from 'antd';
import { useIntl } from 'react-intl';
import CardForm from '~/components/CardForm';
import MockupTable from './MockupTable';
import MockupForm from './MockupForm';
import TaxonomyType from '~/constants/TaxonomyType';
import EntityType from '~/constants/EntityType';
import metadataFactory from '~/services/metadataService';

interface IProps {
  initialValues: any;
}

const formRender = props => <MockupForm {...props} />;

const ProductBaseMockup = (props: IProps) => {
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
        title={t('mockupBox.title')}
        className="mt-4"
        mutation={metadataFactory(EntityType.ProductBase).upsertMetadata}
        formRender={formRender}
        entityId={id}
        taxonomyType={TaxonomyType.ProductBase_Mockup}
        entityType={EntityType.ProductBase}
        onSaveCompleted={onSaveCompleted}
      >
        <MockupTable entityId={id} ref={tableRef} />
      </CardForm>
    </>
  );
};

export default ProductBaseMockup;
