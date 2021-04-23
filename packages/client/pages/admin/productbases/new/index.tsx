import React from 'react';
import { Layout, Button, PageHeader, Row, Col, Typography } from 'antd';
import { gql } from '@apollo/client';

// components
import withAdminLayout from 'layout/AdminLayout';
import Card from 'components/Card';

// graphql
import { withApollo } from 'apollo/apollo';
import { useRouter } from 'next/dist/client/router';
import userService from 'services/userService';
import { productBaseQuery } from 'services/productBaseService';

// inner components
import ProductBaseBasicForm from '~/features/productBases/ProductBaseBasicForm';
import ProductBaseStatus from '~/features/productBases/ProductBaseStatus';
import ProductBasePrintArea from '~/features/productBases/ProductBasePrintArea';
import ProductBaseMockup from '~/features/productBases/ProductBaseMockup';

const { Content } = Layout;

const ProductBaseCreate = props => {
  // DECLARE
  const { messages, t, data } = props;
  const formRef: any = React.createRef();

  // EVENTS
  const onSave = () => {
    formRef.current.onSubmit();
  };

  // RENDER
  const title = 'Create new Product base';
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
              <ProductBaseBasicForm ref={formRef} />
            </Card>
          </Col>
          <Col span="8">
            <ProductBaseStatus />
            <ProductBasePrintArea/>
            <ProductBaseMockup/>
          </Col>
        </Row>
      </Content>
    </>
  );
};

export default withAdminLayout(withApollo({ ssr: false })(ProductBaseCreate));
