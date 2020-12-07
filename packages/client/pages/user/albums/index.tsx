import React, { useState } from 'react';
import { Pagination } from 'antd';
import MainLayout from 'layouts/Main';
import ListThumbnails from 'components/personalizers/ListThumbnails';
import PAGINGATION from 'constants/paginations';

// graphql
import { withApollo } from 'apollo/apollo';
import { useQuery } from '@apollo/react-hooks';
import * as queries from './queries';

//Auth
import { signIn, signOut, useSession } from 'next-auth/client';

let dataSource: Array<any> = [];

const ManagementAlbums = () => {
  const [session] = useSession();
  const { data, loading, error, refetch } = useQuery(queries.GET_ALBUMS, {
    variables: {
      where: { userId: 2 },
      limit: PAGINGATION.pageSize,
      offset: 0,
    },
  });

  // if (loading) return 'Loading...';
  // if (error) return `Error! ${error.message}`;

  if (data && data.getAlbums) {
    dataSource = data.getAlbums;
  }

  const onPagingChange = (page) => {
    return refetch({
      where: { userId: 2 },
      limit: PAGINGATION.pageSize,
      offset: (page - 1) * PAGINGATION.pageSize,
    });
  };

  return (
    <MainLayout>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={signIn}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {JSON.stringify(session)} <br />
          <button onClick={signOut}>Sign out</button>
        </>
      )}

      <h1>All Albums</h1>
      {data && (
        <>
          <ListThumbnails addAction dataSource={dataSource} />
          <Pagination
            onChange={onPagingChange}
            pageSize={PAGINGATION.pageSize}
            total={data.getPagination.total}
          />
        </>
      )}
    </MainLayout>
  );
};

// ManagementAlbums.getInitialProps = async ({ ctx, apolloClient }) => {
//   const { req, res, pathname, query, store, isServer } = ctx;
//   // const cookies = req.headers.cookie.split(';')
//   req.cookies = cookies(ctx);
//   console.log('>req.cookies', req.cookies);
//   const token = await jwt.getToken({ req, secret: process.env.SECRET, raw: true });
//   console.log('JSON Web Token', token);
// };

export default withApollo({ ssr: false })(ManagementAlbums);
