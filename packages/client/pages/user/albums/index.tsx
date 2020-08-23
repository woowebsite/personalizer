import React from "react";
import MainLayout from "layouts/Main";
import ListThumbnails from "components/personalizers/ListThumbnails";
import PAGINGATION from "constants/paginations";

const ManagementAlbums = () => {
  return (
    <MainLayout>
      <h1>This should be rendered on client side</h1>
      <ListThumbnails
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

export default ManagementAlbums;
