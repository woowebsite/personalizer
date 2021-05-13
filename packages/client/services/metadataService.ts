import { gql } from '@apollo/client';
import baseService from './baseService';
import baseQuery from './baseQuery';
import withMutation from 'shared/withMutation';
import withQuery from 'shared/withQuery';

const metadataFactory = postType => {
  const metadataService = {
    getMetadata: options => {
      const query = gql`
        query GetMetadata($where: ${postType}MetadataWhere) {
          metadata(where: $where) {
            rows {
              id
              taxonomy
              termName
              term {
                id
                name
              }
            }
          }
        }
      `;

      return withQuery(query, options);
    },

    upsertMetadata: options => {
      const query = gql`
        mutation Upsert${postType}($refId: Int, $metadata: [MetadataInput]) {
          upsert${postType}Metadata(refId: $refId, metadata: $metadata) {
            id
            value
            __typename
          }
        }
      `;
      return withMutation(query, options);
    },
  };
  return metadataService;
};

export default metadataFactory;
