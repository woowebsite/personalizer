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

function baseQuery(options: {
  name: string;
  plural: string;
}) {
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
    getAll: () => {
      const query = gql`
      query GetAll${plural}($where: ${name}Where, $limit: Int, $offset: Int) {
        ${camelCasePlural}(where: $where, limit: $limit, offset: $offset) {
          rows {
            ${model.fields
              .filter(field => field.type.kind === 'SCALAR')
              .map(field => field.name)}
          }
          count
        }
      }`;

      return query;
    },
    get: () => {
      const query = gql`
      query Get${name}($where: ${name}Where) {
        ${camelCaseName}(where: $where) {
          ${model.fields
            .filter(field => field.type.kind === 'SCALAR')
            .map(field => field.name)}
        }
      }`;
      return query;
    },
    upsert: () => {
      const upsert = gql`
        mutation Upsert${name}($${camelCaseName}: ${name}Input) {
          upsert${name}(
            data: $${camelCaseName}
          ) {
            ${model.fields
              .filter(field => field.type.kind === 'SCALAR')
              .map(field => field.name)}
          }
        }
      `;

      return upsert;
    },
    create: () => {
      const mutation = gql`
        mutation Create${name}($${name}: ${name}Input) {
          create${camelCaseName}(
            data: $${name}
          ) {
            id
          }
        }
      `;
      return mutation;
    },
    update: () => {
      const mutation = gql`
        mutation Update${name}(
          $data: ${name}Input
        ) {
          create${camelCaseName}(
            data: $data
          ) {
            id
          }
        }
      `;
      return mutation;
    },
    delete: () => {
      const mutation = gql`
        mutation Delete${name}(
          $id: Int
        ) {
          delete${camelCaseName}(
            id: $id
          ) {
            id
          }
        }
      `;
      return mutation;
    },
  };

  return baseQuery;
}

export default baseQuery;
