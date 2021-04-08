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
import ProductBaseBasicForm from '~/features/ProductBaseBasicForm';
import SocialConenct from '~/features/SocialConnect';

const { Content } = Layout;

const ProductBaseDetail = props => {
  // DECLARE
  const router = useRouter();
  const { messages, t, data, query } = props;
  const { id } = router.query;
  const formRef: any = React.createRef();

  // EVENTS
  const onSave = () => {
    formRef.current.onSubmit();
  };

  // RENDER
  const title = data.productBase.title || 'Unknow name';
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
              <ProductBaseBasicForm ref={formRef} data={data.productBase} />
            </Card>
          </Col>
          <Col span="12">
            <Card>
              <Typography.Title level={5} className="mb-3">
                {t('socialBox.title')}
              </Typography.Title>
              <SocialConenct />
            </Card>
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
    query: productBaseQuery.get(),
    variables: {
      where: { id: parseInt(query.id) },
    },
  });

  return {
    query,
    data,
  };
};
