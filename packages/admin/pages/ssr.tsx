import React from 'react';
import { gql } from '@apollo/client';
import { withApollo } from 'apollo/apollo';

export const GET_ALBUMS = gql`
  query GetAlbums($where: AlbumWhere, $limit: Int, $offset: Int) {
    getAlbums(where: $where, limit: $limit, offset: $offset) {
      id
      name
      description
      image
      localName @client
    }
    getPagination(where: $where) {
      total
    }
  }
`;

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
    query: GET_ALBUMS,
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
