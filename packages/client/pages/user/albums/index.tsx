import React from 'react';
import MainLayout from 'layouts/Main';
import ListThumbnails from 'components/personalizers/ListThumbnails';
import PAGINGATION from 'constants/paginations';

// graphql
import withQuery from 'shared/withQuery';
import { withApollo } from 'apollo/apollo';
import * as queries from './queries';

//Auth
import { signIn, signOut, useSession } from 'next-auth/client';

const ManagementAlbums = () => {
  const [session] = useSession();
  const { data, refetch } = withQuery(queries.GET_ALBUMS, {
    variables: {
      where: { userId: 2 },
      limit: PAGINGATION.pageSize,
      offset: 0,
    },
  });

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
        <ListThumbnails
          addAction
          dataSource={data.getAlbums}
          dataPaging={data.getPagination}
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
