import React from 'react';
import BasicLayout from 'layout/BasicLayout';
import PAGINGATION from 'constants/paginations';

// graphql
import withQuery from 'shared/withQuery';
import { withApollo } from 'apollo/apollo';
import * as queries from './queries';
import { useRouter } from 'next/dist/client/router';

const AlbumDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, refetch } = withQuery(queries.GET_ALBUM, {
    variables: {
      where: { id: parseInt(id.toString()), userId: 2 },
      limit: PAGINGATION.pageSize,
      offset: 0,
    },
  });

  return (
    <BasicLayout>
      {data && (
        <>
          <h1>{data.album.name}</h1>
          <p>{data.album.description}</p>
          <img alt='example' width='100%' src={data.album.image} />
        </>
      )}
    </BasicLayout>
  );
};

export default withApollo({ ssr: false })(AlbumDetail);
