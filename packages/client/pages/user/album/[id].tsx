import React from 'react';
import BasicLayout from 'layout/BasicLayout';
import PAGINGATION from 'constants/paginations';

// graphql
import { useApolloClient, useQuery, gql, InMemoryCache } from '@apollo/client';
import withQuery from 'shared/withQuery';
import { withApollo } from 'apollo/apollo';
import * as queries from './queries';
import { useRouter } from 'next/dist/client/router';

const AlbumDetail = ({ props }) => {
  if (!props.result) return <>Loading...</>;

  const router = useRouter();
  const { id } = router.query;

  const { album } = props.result;

  return (
    <BasicLayout>
      {JSON.stringify(props.result)}
      {album && (
        <>
          <h1>{album.name}</h1>
          <p>{album.description}</p>
          <img alt='example' width='100%' src={album.image} />
        </>
      )}
    </BasicLayout>
  );
};

AlbumDetail.getInitialProps = async ({ ctx }) => {
  const { apolloClient } = ctx;
  const { cache } = apolloClient;
  const { id: albumId } = ctx.query;

  let result = apolloClient.readQuery({
    query: queries.GET_ALBUM,
    variables: {
      where: { id: albumId, userId: 2 },
    },
  });
  console.log('ctx.query', ctx.query);

  if (!result) {
    const { data, refetch } = await apolloClient.query({
      query: queries.GET_ALBUM,
      variables: {
        where: { id: parseInt(albumId), userId: 2 },
        limit: PAGINGATION.pageSize,
        offset: 0,
      },
    });
    result = data;
  }

  return {
    props: {
      result,
    },
  };
};

export default withApollo({ ssr: true })(AlbumDetail);
