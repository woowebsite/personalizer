import React from 'react';
import { Layout, PageHeader } from 'antd';

// components
import withAdminLayout from 'layout/AdminLayout';

// graphql
import { withApollo } from 'apollo/apollo';
import AccountCreateForm from '~/features/AccountCreateForm';

const { Content } = Layout;

const ManagementMembers = (props) => {
  const { messages } = props;
  const onFinish = () => {};
  return (
    <>
      <PageHeader
        className='mb-4 pl-0 pr-0'
        title={messages.title}
        onBack={() => window.history.back()}
        subTitle={messages.subTitle}
      />
      <Content>
        <AccountCreateForm onFinish={onFinish} />
      </Content>
    </>
  );
};

export default withAdminLayout(withApollo({ ssr: false })(ManagementMembers));
