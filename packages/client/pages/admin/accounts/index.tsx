import React from 'react';
import withAdminLayout from 'layout/AdminLayout';

// components
import AccountTable from './AccountTable';

// graphql
import withQuery from 'shared/withQuery';
import { withApollo } from 'apollo/apollo';
import * as queries from './queries';

const ManagementMembers = (props) => {
  const { data, refetch } = withQuery(queries.GET_USERS);
  return (
    <>
      <h1>{props.messages.title}</h1>
      {data && data.users && <AccountTable dataSource={data.users} />}
    </>
  );
};

export default withAdminLayout(withApollo({ ssr: false })(ManagementMembers));
