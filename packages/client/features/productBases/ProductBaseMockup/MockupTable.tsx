import React, { useState } from 'react';
import ListThumbnails from '~/components/personalizers/ListThumbnails';
import PAGINGATION from 'constants/paginations';
import albumService from 'services/albumService';
import { Spin } from 'antd';

const MockupTable = () => {
  const { data, loading, refetch } = albumService.getAll({
    variables: {
      where: { userId: 2 },
      limit: PAGINGATION.pageSize,
      offset: 0,
    },
  });

  if (loading) return <Spin />;

  return (
    <ListThumbnails
      dataSource={data.albums.rows.map(x => ({
        url: `/user/album/${x.id}`,
        href: `/user/album/[id]`,
        ...x,
      }))}
    />
  );
};

export default MockupTable;
