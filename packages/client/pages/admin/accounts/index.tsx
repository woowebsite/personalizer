import React from 'react';
import { Layout, Button, PageHeader } from 'antd';

// components
import withAdminLayout from 'layout/AdminLayout';
import AccountTable from 'features/AccountTable';
import RedirectButton from '~/components/RedirectButton';

// graphql
import withQuery from 'shared/withQuery';
import { withApollo } from 'apollo/apollo';
import * as queries from 'definitions/user-definitions';

const { Content } = Layout;

const ManagementMembers = (props) => {
  const { data, refetch } = withQuery(queries.GET_USERS);
  const { messages, t } = props;
  return (
    <>
      <PageHeader
        className='mb-4 pl-0 pr-0'
        title={messages.title}
        subTitle={messages.subTitle}
        extra={[
          <Button key='3'>Operation</Button>,
          <Button key='2'>Operation</Button>,
          <RedirectButton type='primary' url={'/admin/accounts/new'}>
            {t('pageHeader.buttons.create')}
          </RedirectButton>,
        ]}
      />
      <Content>
        {data && data.users && <AccountTable dataSource={data.users} />}
      </Content>
    </>
  );
};

export default withAdminLayout(withApollo({ ssr: false })(ManagementMembers));
