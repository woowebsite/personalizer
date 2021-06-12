import { gql } from '@apollo/client';
import baseService from './baseService';
import baseQuery from './baseQuery';
import withMutation from 'shared/withMutation';
import withQuery from 'shared/withQuery';

export const pdBaseQuery = baseQuery({
  name: 'ProductBase',
  plural: 'ProductBases',
});

export const pdQuery = {
  getProductBase: gql`
    query GetProductBase($entityId: Int) {
      productBase(where: { id: $entityId }) {
        id
        title
        description
        status
        primaryImageUrl
        providerId
        visibility
        publishDate
        user {
          name
        }

        productbase_category {
          name
          value
        }
        productbase_tag {
          name
          value
        }
      }
      termRelationships(where: { entityId: $entityId }) {
        id
        taxonomyId
        orderBy
        entityId
        entityType
        termTaxonomy {
          term {
            name
          }
        }
      }
    }
  `,
};

export const definitions = {
  getJob: options => {
    return withQuery(pdQuery.getProductBase, options);
  },
};

const productBaseService = baseService({
  name: 'ProductBase',
  plural: 'ProductBases',
  definitions,
});
export default productBaseService;
