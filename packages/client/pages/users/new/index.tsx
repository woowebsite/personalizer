import React from 'react';
import Head from 'next/head';
import { Layout, PageHeader, Row, Col, Card } from 'antd';

// components
import withAdminLayout from 'layout/AdminLayout';
import RedirectButton from '~/components/RedirectButton';
import Button from 'components/Button';

// graphql
import { withApollo } from 'apollo/apollo';
import UserForm from '~/features/UserForm';

const { Content } = Layout;

const ManagementUsers = props => {
  const { messages, t } = props;
  const formRef: any = React.createRef();

  const onSave = () => {
    formRef.current.submit();
  };
  return (
    <>
      <Head>
        <title>{messages.title}</title>
      </Head>
      <PageHeader
        className="mb-4 pl-0 pr-0"
        title={messages.title}
        onBack={() => window.history.back()}
        extra={[
          <RedirectButton url={'/admin/users'} key="1">
            {t('buttons.cancel')}
          </RedirectButton>,
          <Button onClick={onSave} key="2" type="primary">
            {t('buttons.save')}
          </Button>,
        ]}
      />
      <Content>
        <Row gutter={24}>
          <Col span="16">
            <Card className="pt-3">
              <UserForm ref={formRef} />
            </Card>
          </Col>
        </Row>
      </Content>
    </>
  );
};

export default withAdminLayout(withApollo({ ssr: false })(ManagementUsers));
