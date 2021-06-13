import React, { useState } from 'react';
import { Layout, Button, PageHeader, Row, Col, Typography } from 'antd';
import { gql } from '@apollo/client';

// components
import withAdminLayout from 'layout/AdminLayout';
import Card from 'components/Card';

// graphql
import { withApollo } from 'apollo/apollo';
import { useRouter } from 'next/dist/client/router';
import productBaseService, { pdQuery } from 'services/productBaseService';

// inner components
import ProductBaseBasicForm from '~/features/productBases/ProductBaseBasicForm';
import SocialConenct from '~/features/SocialConnect';
import { fieldsToMetadata } from '~/shared/metadataHelper';
import ProductBaseStatus from '~/features/productBases/ProductBaseStatus';
import ProductBasePrintArea from '~/features/productBases/ProductBasePrintArea';
import ProductBaseMockup from '~/features/productBases/ProductBaseMockup';
import ProductBaseCombinePrintArea from '~/features/productBases/ProductBaseCombinePrintArea';

const { Content } = Layout;

const ProductBaseDetail = props => {
  // DECLARE
  const router = useRouter();
  const { messages, t, data, query } = props;
  const { id } = router.query;
  const formRef: any = React.createRef();
  const formStatusRef: any = React.createRef();
  const [upsertProductBase] = productBaseService.upsert(); //(userQueries.UPSERT_USER);
  const [title, setTitle] = useState(data.productBase.title);

  // EVENTS
  const onSave = async () => {
    let isValid = true;
    await formRef.current.validateFields().catch(() => {
      isValid = false;
    });
    await formStatusRef.current.validateFields().catch(() => {
      isValid = false;
    });

    if (!isValid) return;

    // prepare data
    const formValues = formRef.current.getFieldsValue();
    const statusValues = formStatusRef.current.getFieldsValue();

    const metadataFields = {
      ...formValues.metadata,
    };
    const taxonomyFields = {
      ...formValues.taxonomies,
      ...statusValues.taxonomies,
    };
    // parse
    const productBase = data.productBase
      ? {
          id: data.productBase.id,
          ...formValues.productBase,
          ...statusValues.productBase,
        }
      : formValues.productBase;
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
          <Col span="12">
            <Card className="pt-3">
              <ProductBaseBasicForm
                ref={formRef}
                onFieldChange={handleFieldChanged}
                data={data.productBase}
              />
            </Card>
          </Col>
          <Col span="8">
            <ProductBaseStatus
              initialValues={data.productBase}
              ref={formStatusRef}
            />
            <ProductBasePrintArea initialValues={data.productBase} />
            {/* <ProductBaseMockup initialValues={data.productBase} />
            <ProductBaseCombinePrintArea initialValues={data.productBase} /> */}
          </Col>
        </Row>
      </Content>
    </>
  );
};

export default withAdminLayout(withApollo({ ssr: true })(ProductBaseDetail));

ProductBaseDetail.getInitialProps = async ({ ctx }) => {
  const { res, req, query, pathname, apolloClient } = ctx;

  const { data, loading, refetch } = await apolloClient.query({
    query: pdQuery.getProductBase,
    variables: {
      id: parseInt(query.id),
    },
  });

  return {
    query,
    data,
  };
};
