import { gql } from '@apollo/client';
import baseService from './baseService';
import baseQuery from './baseQuery';
import withMutation from 'shared/withMutation';
import withQuery from 'shared/withQuery';
import EntityType from '~/constants/EntityType';

export const taxonomyQuery = baseQuery({
  name: 'TermTaxonomy',
  plural: 'TermTaxonomies',
});

const metadataFactory = (entityType: EntityType) => {
  const definitions = {
    getMetadata: options => {
      const query = gql`
        query GetMetadata($where: TermRelationshipWhere) {
          termRelationships(where: $where) {
            rows {
              id
              entityType
              entityId
              orderBy
              termTaxonomy {
                taxonomy
                term {
                  id
                  name
                }
              }
            }
          }
        }
      `;
      return withQuery(query, options);
    },

    upsertMetadata: options => {
      const query = gql`
        mutation UpsertTermRelationship(
          $entityId: Int
          $entityType: String
          $taxonomy: String
          $termMeta: [TermMetaInput]
          $term: TermInput
        ) {
          upsertTermRelationship(
            entityId: $entityId
            entityType: $entityType
            taxonomy: $taxonomy
            termMeta: $termMeta
            term: $term
          ) {
            id
          }
        }
      `;
      return withMutation(query, options);
    },
  };

  const metadataService = baseService({
    name: 'TermTaxonomy',
    plural: 'TermTaxonomies',
    definitions,
  });
  return metadataService;
};

export default metadataFactory;
