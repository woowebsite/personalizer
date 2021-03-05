import React from 'react';
import withUserLayout from 'layout/UserLayout';
import ListThumbnails from 'components/personalizers/ListThumbnails';
import PAGINGATION from 'constants/paginations';
import Link from 'next/link';

// graphql
import withQuery from 'shared/withQuery';
import { withApollo } from 'apollo/apollo';
import * as queries from 'definitions/album-definitions';
import albumService from 'definitions/album-definitions';

const ManagementAlbums = ({ props }) => {
  const q = albumService.getAll();
  const { data, refetch } = withQuery(q, {
    variables: {
      where: { userId: 2 },
      limit: PAGINGATION.pageSize,
      offset: 0,
    },
  });

  return (
    <>
      <h1>All Albums</h1>
      {data && (
        <ListThumbnails
          allowAddMore
          dataSource={data.getAlbums.map((x) => ({
            url: `/user/album/${x.id}`,
            href: `/user/album/[id]`,
            ...x,
          }))}
          dataPaging={data.getPagination}
          onReload={() => refetch()}
          onPagingChange={(page) =>
            refetch({
              where: { userId: 2 },
              limit: PAGINGATION.pageSize,
              offset: (page - 1) * PAGINGATION.pageSize,
            })
          }
        />
      )}
    </>
  );
};

export default withUserLayout(withApollo({ ssr: false })(ManagementAlbums));
