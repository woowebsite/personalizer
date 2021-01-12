import React from 'react';
import withUserLayout from 'layout/UserLayout';
import ListThumbnails from 'components/personalizers/ListThumbnails';

// graphql
import withQuery from 'shared/withQuery';
import { withApollo } from 'apollo/apollo';
import * as queries from './queries';
import * as queries2 from 'pages/user/album/queries';

const ManagementMembers = ({ props }) => {
  const { data, refetch } = withQuery(queries.GET_USERS);

  return (
    <>
      <h1>All Members</h1>
      {JSON.stringify(data)}
      {data && data.users && (
        <ListThumbnails
          dataSource={data.users.map((x) => ({
            url: `/user/album/${x.id}`,
            href: `/user/album/[id]`,
            ...x,
          }))}
          onReload={() => refetch()}
        />
      )}
    </>
  );
};

export default withUserLayout(withApollo({ ssr: false })(ManagementMembers));
