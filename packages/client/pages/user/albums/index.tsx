import React from 'react';
import BasicLayout from 'layout/BasicLayout';
import ListThumbnails from 'components/personalizers/ListThumbnails';
import PAGINGATION from 'constants/paginations';

// graphql
import { useApolloClient, gql, InMemoryCache } from '@apollo/client';
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

  // Write query data into Apollo Cache
  const client = useApolloClient();
  if (data) {
    client.writeQuery({
      query: queries.GET_ALBUMS,
      data: data,
    });

    const cache = new InMemoryCache();
    cache.modify({
      fragment: gql`
        fragment MyTodo on Album {
            localName
        }
      `,
      data: {
        localName: 'XXXX',
      },
    });
  }

  // Read query data from cache
  const result = client.readQuery({
    query: queries.GET_ALBUMS,
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

      {result && (
        <>
          {JSON.stringify(result)}
          <h2>{result.clientField}</h2>
          <ListThumbnails
            allowAddMore
            dataSource={result.getAlbums}
            dataPaging={result.getPagination}
            onReload={() => refetch()}
            onPagingChange={(page) =>
              refetch({
                where: { userId: 2 },
                limit: PAGINGATION.pageSize,
                offset: (page - 1) * PAGINGATION.pageSize,
              })
            }
          />
        </>
      )}
    </BasicLayout>
  );
};

export default withApollo()(ManagementAlbums);
