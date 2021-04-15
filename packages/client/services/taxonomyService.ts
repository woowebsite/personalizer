import { gql } from '@apollo/client';
import baseService from './baseService';
import baseQuery from './baseQuery';
import withMutation from 'shared/withMutation';
import withQuery from 'shared/withQuery';

const definitions = {
  getTaxonomiesByType: taxonomy => {
    const query = gql`
      query GetTermTaxonomies($where: TermTaxonomyWhere) {
        termTaxonomies(where: $where) {
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

    return withQuery(query, {
      variables: {
        where: { taxonomy },
      },
    });
  },
};
export const termTaxonomyQuery = baseQuery({
  name: 'TermTaxonomy',
  plural: 'TermTaxonomys',
});

const termTaxonomyService = baseService({
  name: 'TermTaxonomy',
  plural: 'TermTaxonomies',
  definitions,
});
export default termTaxonomyService;
