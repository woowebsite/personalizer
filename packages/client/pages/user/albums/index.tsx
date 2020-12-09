import React from 'react';
import MainLayout from 'layouts/Main';
import ListThumbnails from 'components/personalizers/ListThumbnails';
import PAGINGATION from 'constants/paginations';

// graphql
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
    <MainLayout>
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
    </MainLayout>
  );
};

export default withApollo({ ssr: false })(ManagementAlbums);
