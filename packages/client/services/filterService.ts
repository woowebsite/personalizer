import { gql } from '@apollo/client';
import baseService from './baseService';
import withMutation from 'shared/withMutation';
import withQuery from 'shared/withQuery';

const definitions = {
  getFiltersByModel: options => {
    const query = gql`
      query GetFilterByModel($where: FilterWhere) {
        filters(where: $where) {
          rows {
            id
            title
            conditions
            model_name
            status
            user_id
            __typename
          }
          count
        }
      }
    `;

    return withQuery(query, options);
  },
};

const filterService = baseService({
  name: 'Filter',
  plural: 'Filters',
  definitions,
});
export default filterService;
