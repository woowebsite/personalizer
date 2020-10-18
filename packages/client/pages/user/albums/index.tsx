import React from "react";
import MainLayout from "layouts/Main";
import ListThumbnails from "components/personalizers/ListThumbnails";
import PAGINGATION from "constants/paginations";

// graphql
import { withApollo } from "apollo/apollo";
import { useQuery } from "@apollo/react-hooks";
import * as queries from "./queries";

//Auth
import { signIn, signOut, useSession } from 'next-auth/client'



let dataSource: Array<any> = [];

const ManagementAlbums = () => {
  const { data, loading, error, refetch, fetchMore } = useQuery(queries.GET_ALBUMS, {
    variables: { where: { userId: 5 }, limit: PAGINGATION.pageSize, offset: 1 }
  });


  if (data && data.getAlbums) {
    dataSource = data.getAlbums
  }

  const [session, sessionLoading] = useSession();

  return (
    <MainLayout>
      {session && JSON.stringify(session)}
      {sessionLoading}

      <h1>All Albums</h1>
      {data &&
        <ListThumbnails
          dataSource={dataSource}
          pagination={{
            onChange: (page) => {
              return refetch({
                where: { userId: 5 }, limit: PAGINGATION.pageSize, offset: page
              });
            },
            pageSize: PAGINGATION.pageSize,
            total: data.getPagination.total
          }}
        />
      }
    </MainLayout>
  );
};

export default withApollo({ ssr: false })(ManagementAlbums);
