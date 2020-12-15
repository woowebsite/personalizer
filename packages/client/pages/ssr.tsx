import React from 'react';
import { withApollo } from 'apollo/apollo';

import * as queries from 'pages/user/albums/queries';

const SSR = ({ props }) => {
  console.log(props.data);
  return (
    <div>
      <h1>This should be rendered on server side</h1>
      <pre>Data: {JSON.stringify(props.data)}</pre>
    </div>
  );
};

SSR.getInitialProps = async ({ ctx }) => {
  const { apolloClient } = ctx;
  const result = await apolloClient.query({
    query: queries.GET_ALBUMS,
    variables: {
      where: { userId: 2 },
      limit: 4,
      offset: 0,
    },
  });

  return {
    props: {
      data: result.data,
    },
  };
};

export default withApollo({ ssr: true })(SSR);
