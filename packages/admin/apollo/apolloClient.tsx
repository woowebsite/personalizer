import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import fetch from 'isomorphic-unfetch';
import { createUploadLink } from 'apollo-upload-client';
import { RestLink } from 'apollo-link-rest';

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

  const uploadLink = new createUploadLink({
    uri: process.env.GRAPHQL_URI, // must be absolute
    credentials: 'same-origin',
    fetch,
  });

  const restLink = new RestLink({
    uri: process.env.mockApi
  });

  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: ApolloLink.from([restLink, uploadLink]),
    cache,
  });
}
