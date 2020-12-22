import React from 'react';
import BasicLayout from 'layout/BasicLayout';
import PAGINGATION from 'constants/paginations';

// graphql
// import { useApolloClient, gql, InMemoryCache } from '@apollo/client';
import withQuery from 'shared/withQuery';
import { withApollo } from 'apollo/apollo';
import * as queries from './queries';
import { useRouter } from 'next/dist/client/router';

const AlbumDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  // Query
  const albumId = parseInt(id.toString());
  const { data, refetch } = withQuery(queries.GET_ALBUM, {
    variables: {
      where: { id: albumId, userId: 2 },
      limit: PAGINGATION.pageSize,
      offset: 0,
    },
  });

  return (
    <BasicLayout>
      {data && (
        <>
          <h1>{data.getAlbum.name}</h1>
          <p>
            {data.getAlbum.description}
          </p>
          <img alt='example' width="100%" src={data.getAlbum.image} />
        </>
      )}
    </BasicLayout>
  );
};

export default withApollo({ ssr: false })(AlbumDetail);
