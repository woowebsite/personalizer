import React, { useState } from 'react';
import { Layout, Button, PageHeader, Row, Col, Typography } from 'antd';
import { gql } from '@apollo/client';

// components
import withAdminLayout from 'layout/AdminLayout';
import Card from 'components/Card';

// graphql
import { withApollo } from 'apollo/apollo';
import { useRouter } from 'next/dist/client/router';
import userService from 'services/userService';
import productBaseService, {
  productBaseQuery,
} from 'services/productBaseService';

// inner components
import ProductBaseBasicForm from '~/features/productBases/ProductBaseBasicForm';
import ProductBaseStatus from '~/features/productBases/ProductBaseStatus';
import ProductBasePrintArea from '~/features/productBases/ProductBasePrintArea';
import ProductBaseCombinePrintArea from '~/features/productBases/ProductBaseCombinePrintArea';
import ProductBaseMockup from '~/features/productBases/ProductBaseMockup';
import { fieldsToMetadata } from '~/shared/metadataHelper';

const { Content } = Layout;

const ProductBaseCreate = props => {
  // DECLARE
  const { messages, t, data } = props;
  const formRef: any = React.createRef();
  const [upsertProductBase] = productBaseService.upsert(); //(userQueries.UPSERT_USER);
  const [title, setTitle] = useState(messages.title);

  // EVENTS
  const onSave = async () => {
    // check if valid all forms
    let isValid = true;
    await formRef.current.validateFields().catch(() => {
      isValid = false;
    });

    // prepare data
    const formValues = formRef.current.getFieldsValue();
    const metadataFields = {
      ...formValues.metadata,
    };
    const taxonomyFields = {
      ...formValues.taxonomies,
    };
    // parse
    const productBase = formValues.productBase;
    const metadata = fieldsToMetadata(metadataFields);
    const taxonomies = taxonomyFields ? Object.values(taxonomyFields) : [];

    upsertProductBase({
      variables: { productBase, metadata, taxonomies },
    });
  };

  const handleFieldChanged = (path, title: string) => {
    setTitle(title);
  };

  // RENDER
  return (
    <>
      <PageHeader
        className="mb-4 pl-0 pr-0"
        title={title}
        subTitle={messages.subTitle}
        extra={[
          <Button key="3">Duplicate</Button>,
          <Button key="2" danger>
            {t('buttons.delete')}
          </Button>,
          <Button key="1" type="primary" onClick={onSave}>
            {t('buttons.save')}
          </Button>,
        ]}
      />
      <Content>
        <Row gutter={24}>
          <Col span="16">
            <Card className="pt-3">
              <ProductBaseBasicForm
                ref={formRef}
                onFieldChange={handleFieldChanged}
              />
            </Card>
          </Col>
          <Col span="8">
            <ProductBaseStatus />
            <ProductBasePrintArea />
            <ProductBaseMockup />
            <ProductBaseCombinePrintArea />
          </Col>
        </Row>
      </Content>
    </>
  );
};

export default withAdminLayout(withApollo({ ssr: false })(ProductBaseCreate));
