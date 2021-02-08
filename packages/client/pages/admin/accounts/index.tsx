import React from 'react';
import withAdminLayout from 'layout/AdminLayout';
import ListThumbnails from 'components/personalizers/ListThumbnails';

// graphql
import withQuery from 'shared/withQuery';
import { withApollo } from 'apollo/apollo';
import * as queries from './queries';

const ManagementMembers = ({ props }) => {
  const { data, refetch } = withQuery(queries.GET_USERS);

  return (
    <>
      <h1>All Members</h1>
      {data && data.users && (
        <ListThumbnails
          dataSource={data.users.map((x) => ({
            url: `/user/member/${x.id}`,
            href: `/user/member/[id]`,
            image: x.avatar,
            ...x,
          }))}
          onReload={() => refetch()}
        />
      )}
    </>
  );
};

export default withAdminLayout(withApollo({ ssr: false })(ManagementMembers));
