import React from 'react';
import MainLayout from 'layouts/Main';
import ListThumbnails from 'components/personalizers/ListThumbnails';
import PAGINGATION from 'constants/paginations';

// graphql
import { withApollo } from 'apollo/apollo';
import { useQuery } from '@apollo/react-hooks';
import * as queries from './queries';

//Auth
import cookies from 'next-cookies';
import { signIn, signOut, useSession } from 'next-auth/client';
import jwt from 'next-auth/jwt';

let dataSource: Array<any> = [];

const ManagementAlbums = (a) => {
  const { data, loading, error, refetch, fetchMore } = useQuery(
    queries.GET_ALBUMS,
    {
      variables: {
        where: { userId: 5 },
        limit: PAGINGATION.pageSize,
        offset: 1,
      },
    }
  );

  if (data && data.getAlbums) {
    dataSource = data.getAlbums;
  }

  const [session, sessionLoading] = useSession();

  return (
    <MainLayout>
      {session && JSON.stringify(session)}
      {sessionLoading}

      <h1>All Albums</h1>
      {data && (
        <ListThumbnails
          dataSource={dataSource}
          pagination={{
            onChange: (page) => {
              return refetch({
                where: { userId: 5 },
                limit: PAGINGATION.pageSize,
                offset: page,
              });
            },
            pageSize: PAGINGATION.pageSize,
            total: data.getPagination.total,
          }}
        />
      )}
    </MainLayout>
  );
};

ManagementAlbums.getInitialProps = async ({ ctx, apolloClient }) => {
  const { req, res, pathname, query, store, isServer } = ctx;
  // const cookies = req.headers.cookie.split(';')
  req.cookies = cookies(ctx);
  console.log('>req.cookies', req.cookies);
  const token = await jwt.getToken({ req, secret: process.env.SECRET, raw: true });
  console.log('JSON Web Token', token);
};

export default withApollo({ ssr: true })(ManagementAlbums);
