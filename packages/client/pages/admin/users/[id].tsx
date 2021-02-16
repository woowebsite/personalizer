import React from 'react';
import BasicLayout from 'layout/BasicLayout';
import PAGINGATION from 'constants/paginations';

// graphql
import withQuery from 'shared/withQuery';
import { withApollo } from 'apollo/apollo';
import * as queries from 'definitions/user-definitions';
import { useRouter } from 'next/dist/client/router';

const UserDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, refetch } = withQuery(queries.GET_USER, {
    variables: {
      id: parseInt(id.toString()),
    },
  });

  return <BasicLayout>{data && JSON.stringify(data)}</BasicLayout>;
};

export default withApollo({ ssr: false })(UserDetail);
