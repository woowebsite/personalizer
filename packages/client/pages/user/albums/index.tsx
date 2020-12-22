import React from 'react';
import BasicLayout from 'layout/BasicLayout';
import ListThumbnails from 'components/personalizers/ListThumbnails';
import PAGINGATION from 'constants/paginations';

// graphql
// import { useApolloClient, gql, InMemoryCache } from '@apollo/client';
import withQuery from 'shared/withQuery';
import { withApollo } from 'apollo/apollo';
import * as queries from './queries';

const ManagementAlbums = () => {
  const { data, refetch } = withQuery(queries.GET_ALBUMS, {
    variables: {
      where: { userId: 2 },
      limit: PAGINGATION.pageSize,
      offset: 0,
    },
  });

  return (
    <BasicLayout>
      <h1>All Albums</h1>
      {data && (
        <ListThumbnails
          allowAddMore
          dataSource={data.getAlbums}
          dataPaging={data.getPagination}
          onReload={() => refetch()}
          onPagingChange={(page) =>
            refetch({
              where: { userId: 2 },
              limit: PAGINGATION.pageSize,
              offset: (page - 1) * PAGINGATION.pageSize,
            })
          }
        />
      )}
    </BasicLayout>
  );
};

export default withApollo()(ManagementAlbums);
