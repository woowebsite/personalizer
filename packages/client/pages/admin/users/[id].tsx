import React from 'react';
import { Layout, Button, PageHeader } from 'antd';

// components
import withAdminLayout from 'layout/AdminLayout';
import RedirectButton from '~/components/RedirectButton';

// graphql
import withQuery from 'shared/withQuery';
import { withApollo } from 'apollo/apollo';
import * as queries from 'definitions/user-definitions';
import { useRouter } from 'next/dist/client/router';
import UserForm from '~/features/UserForm';

const { Content } = Layout;

const UserDetail = (props) => {
  // DECLARE
  const { messages, t } = props;
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, refetch } = withQuery(queries.GET_USER, {
    variables: {
      id: parseInt(id.toString()),
    },
  });

  if (loading) {
    return null;
  }

  const title = data.user.name || 'Unknow name';

  // RENDER
  return (
    <>
      <PageHeader
        className='mb-4 pl-0 pr-0'
        title={title}
        subTitle={messages.subTitle}
        extra={[
          <Button key='3'>Duplicate</Button>,
          <Button key='2'>Operation</Button>,
          <RedirectButton type='primary' url={'/admin/accounts/new'}>
            {t('pageHeader.buttons.save')}
          </RedirectButton>,
        ]}
      />
      <Content>
        <UserForm id={parseInt(id.toString())} />
      </Content>
    </>
  );
};

export default withAdminLayout(withApollo({ ssr: false })(UserDetail));
