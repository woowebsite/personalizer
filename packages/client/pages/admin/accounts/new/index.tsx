import React from 'react';
import { Layout, Button, PageHeader } from 'antd';

// components
import withAdminLayout from 'layout/AdminLayout';

// graphql
import withQuery from 'shared/withQuery';
import { withApollo } from 'apollo/apollo';
import * as queries from '../queries';

const { Content } = Layout;

const ManagementMembers = (props) => {
  const { data, refetch } = withQuery(queries.GET_USERS);
  const { messages, t } = props;
  return (
    <>
      <PageHeader
        className='mb-4 pl-0 pr-0'
        title={messages.title}
        onBack={history.back}
        subTitle={messages.subTitle}
        extra={[
          <Button key='3'>Operation</Button>,
          <Button key='2'>Operation</Button>,
          <Button key='1' type='primary'>
            {t('pageHeader.buttons.create')}
          </Button>,
        ]}
      />
      <Content>
        dsdsd
      </Content>
    </>
  );
};

export default withAdminLayout(withApollo({ ssr: false })(ManagementMembers));
