import { ApolloClient, InMemoryCache } from '@apollo/client';
import { HttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';
import { createUploadLink } from 'apollo-upload-client';

export default function createApolloClient(initialState, ctx) {
  const cache = new InMemoryCache({
    typePolicies: {
      Album: {
        fields: {
          localName: {
            read(_, { variables }) {
              // Return the cached name, transformed to upper case
              // return name.toUpperCase();
              return 'xxx';
            },
          },
        },
      },
      Product: {
        keyFields: ['upc'],
      },
    },
  }).restore(initialState);
  
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: new createUploadLink({
      uri: process.env.GRAPHQL_URI, // must be absolute
      credentials: 'same-origin',
      fetch,
    }),
    // cache: new InMemoryCache().restore(initialState),
    cache,
  });
}
