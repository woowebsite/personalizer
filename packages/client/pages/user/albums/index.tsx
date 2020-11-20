import React from 'react';
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
  const { data, loading, error, refetch, fetchMore } = useQuery(
    queries.GET_ALBUMS,
    {
      variables: {
        where: { userId: 2 },
        limit: PAGINGATION.pageSize,
        offset: 0,
      },
    }
  );

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  if (data && data.getAlbums) {
    dataSource = data.getAlbums;

    if (dataSource[0] && dataSource[0].type != 'action') {
      dataSource.unshift({
        type: 'action',
      });
    }
  }


  return (
    <MainLayout>
      {/* {!session && (
        <>
          Not signed in <br />
          <button>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {JSON.stringify(session)} <br />
          <button>Sign out</button>
        </>
      )} */}

      <h1>All Albums</h1>
      {data && (
        <ListThumbnails
          dataSource={dataSource}
          pagination={{
            onChange: (page) => {
              return refetch({
                where: { userId: 2 },
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

export default withApollo({ ssr: false })(ManagementAlbums);
