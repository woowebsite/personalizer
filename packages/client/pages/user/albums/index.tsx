import React from "react";
import MainLayout from "layouts/Main";
import ListThumbnails from "components/personalizers/ListThumbnails";
import PAGINGATION from "constants/paginations";

// graphql
import { withApollo } from "apollo/apollo";
import { useQuery } from "@apollo/react-hooks";
import * as queries from "./queries";


const dataSource: Array<any> = [
  {
    title: "Add new album",
    type: 'action'
  },
];

const ManagementAlbums = () => {
  const { data, loading, error, refetch } = useQuery(queries.GET_ALBUMS, {
    variables: { userId: 5 }
  });

  if (data && data.getAlbums) dataSource.push(data.getAlbums)

  return (
    <MainLayout>
      <h1>All Albums</h1>
      <ListThumbnails
        dataSource={dataSource}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: PAGINGATION.pageSize,
        }}
      />
    </MainLayout>
  );
};

export default withApollo({ ssr: false })(ManagementAlbums);
