import gqlSchemas from './graphql.schema.json';
import { gql } from '@apollo/client';
import withMutation from 'shared/withMutation';
import withQuery from 'shared/withQuery';
import _ from 'lodash';

const getModel = (modelName: string) => {
  const model = gqlSchemas.__schema.types.find(
    t => t.kind === 'OBJECT' && t.name === modelName,
  );
  return model;
};

/**
 * Graphql dynamic queries CRUD
 * @param options name of model, plural name of model
 * @returns {
 *  get,
 *  getAll,
 *  create,
 *  update,
 *  delete,
 *  upsert
 * }
 */
function baseQuery(options: { name: string; plural: string }) {
  const { name, plural } = options;
  const model = getModel(name);
  const camelCaseName = _.camelCase(name);
  const camelCasePlural = _.camelCase(plural);

  const baseQuery = {
    /**
     * Get all items includes paging, filter
     * @param options { where: {name: 'abc'}, limit: 1, offset: 2 }
     * @returns
     */
    getAll: gql`
      query GetAll${plural}($where: ${name}Where, $limit: Int, $offset: Int) {
        ${camelCasePlural}(where: $where, limit: $limit, offset: $offset) {
          rows {
            ${model.fields
              .filter(field => field.type.kind === 'SCALAR')
              .map(field => field.name)}
          }
          count
        }
      }`,
    /**
     * Get an item
     */
    get: gql`
      query Get${name}($where: ${name}Where) {
      ${camelCaseName}(where: $where) {
        ${model.fields
          .filter(field => field.type.kind === 'SCALAR')
          .map(field => field.name)}
        }
      }`,
    upsert: gql`
      mutation Upsert${name}($${camelCaseName}: ${name}Input, $metadata: [${name}MetaInput], $taxonomies: [Int]=[]) {
        upsert${name}(
          data: $${camelCaseName},
          metadata: $metadata,
          taxonomies: $taxonomies
        ) {
          ${model.fields
            .filter(field => field.type.kind === 'SCALAR')
            .map(field => field.name)}
        }
      }`,
    create: gql`
      mutation Create${name}($${name}: ${name}Input) {
        create${camelCaseName}(
          data: $${name}
        ) {
          id
        }
      }`,
    update: gql`
      mutation Update${name}(
        $data: ${name}Input
      ) {
        create${camelCaseName}(
          data: $data
        ) {
          id
        }
      }`,
    delete: gql`
      mutation Delete${name}(
        $id: Int
      ) {
        delete${name}(
          id: $id
        ) 
      }`,
  };

  return baseQuery;
}

export default baseQuery;
