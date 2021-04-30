import React from 'react';
import { Layout, Button, PageHeader } from 'antd';

// components
import withAdminLayout from 'layout/AdminLayout';
import CustomerTable from 'features/customers/CustomerTable';
import RedirectButton from '~/components/RedirectButton';

// graphql
import { withApollo } from 'apollo/apollo';

const { Content } = Layout;

const ManagementCustomers = props => {
  const { messages, t } = props;
  return (
    <>
      <PageHeader
        className="mb-4 pl-0 pr-0"
        title={messages.title}
        subTitle={messages.subTitle}
        extra={[
          <Button key="3">Operation</Button>,
          <Button key="2">Operation</Button>,
          <RedirectButton type="primary" url={'/admin/customers/new'}>
            {t('pageHeader.buttons.create')}
          </RedirectButton>,
        ]}
      />
      <Content>
        <CustomerTable />
      </Content>
    </>
  );
};

export default withAdminLayout(withApollo({ ssr: false })(ManagementCustomers));
