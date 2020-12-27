import React from 'react';
import withUserLayout from 'layout/UserLayout';
import ListThumbnails from 'components/personalizers/ListThumbnails';
import PAGINGATION from 'constants/paginations';
import Link from 'next/link';

// graphql
import { useApolloClient, gql, InMemoryCache } from '@apollo/client';
import withQuery from 'shared/withQuery';
import { withApollo } from 'apollo/apollo';
import * as queries from './queries';

const ManagementAlbums = ({ props }) => {
  // if (!props.result) return <>Loading...</>;

  const { data, refetch } = props.result;

  return (
    <>
      <h1>All Albums</h1>
      {data && (
        <ListThumbnails
          allowAddMore
          dataSource={data.getAlbums.map((x) => ({
            url: `/user/album/${x.id}`,
            href: `/user/album/[id]`,
            ...x,
          }))}
          dataPaging={data.getPagination}
          onReload={() => refetch()}
          onPagingChange={(page) =>
            refetch({
              where: { userId: 3 },
              limit: PAGINGATION.pageSize,
              offset: (page - 1) * PAGINGATION.pageSize,
            })
          }
        />
      )}
    </>
  );
};
ManagementAlbums.getInitialProps = async ({ ctx }) => {
  const { apolloClient, currentUser } = ctx;

  const result = await apolloClient.query({
    query: queries.GET_ALBUMS,
    variables: {
      where: { userId: 2 },
      limit: PAGINGATION.pageSize,
      offset: 0,
    },
  });

  const { cache } = apolloClient;
  cache.writeQuery({
    query: queries.GET_ALBUMS,
    variables: {
      where: { userId: 2 },
      limit: PAGINGATION.pageSize,
      offset: 0,
    },
    data: result.data,
  });

  return {
    props: {
      result,
    },
  };
};
export default withUserLayout(withApollo({ ssr: true })(ManagementAlbums));
