import gqlSchemas from './graphql.schema.json';
import { gql } from '@apollo/client';
import withMutation from 'shared/withMutation';
import withQuery from 'shared/withQuery';
import _ from 'lodash';

const getModel = (modelName: string) => {
  const model = gqlSchemas.__schema.types.find(
    (t) => t.kind === 'OBJECT' && t.name === modelName
  );
  return model;
};

function baseService(options: {
  name: string;
  plural: string;
  definitions: any;
}) {
  const { name, plural, definitions } = options;
  const model = getModel(name);

  const baseQuery = {
    /**
     * Get all items includes paging, filter
     * @param options { where: {name: 'abc'}, limit: 1, offset: 2 }
     * @returns 
     */
    getAll: (options) => {
      const query = gql`
      query GetAll${plural}($where: ${name}Where, $limit: Int, $offset: Int) {
        ${plural.toLowerCase()}(where: $where, limit: $limit, offset: $offset) {
          rows {
            ${model.fields
              .filter((field) => field.type.kind === 'SCALAR')
              .map((field) => field.name)}
          }
          count
        }
      }`;

      return withQuery(query, options);
    },
    get: (options) => {
      const query = gql`
      query Get${name}($where: ${name}Where) {
        ${name.toLowerCase()}(where: $where) {
          ${model.fields
            .filter((field) => field.type.kind === 'SCALAR')
            .map((field) => field.name)}
        }
      }`;
      return withQuery(query, options);
    },
    upsert: (options) => {
      const upsert = gql`
        mutation Upsert${name}($${name.toLowerCase()}: ${name}Input) {
          upsert${name}(
            data: $${name.toLowerCase()}
          ) {
            ${model.fields
              .filter((field) => field.type.kind === 'SCALAR')
              .map((field) => field.name)}
          }
        }
      `;

      return withMutation(upsert, options);
    },
    create: () => {
      const mutation = gql`
        mutation Create${name}($${name}: ${name}Input) {
          create${name}(
            data: $${name}
          ) {
            id
          }
        }
      `;
      return withMutation(mutation);
    },
    update: (variables) => {
      const mutation = gql`
        mutation Update${name}(
          $data: ${name}Input
        ) {
          create${name}(
            data: $data
          ) {
            id
          }
        }
      `;
      return withMutation(mutation);
    },
    delete: () => {
      const mutation = gql`
        mutation Delete${name}(
          $id: Int
        ) {
          delete${name}(
            id: $id
          ) {
            id
          }
        }
      `;
      return withMutation(mutation);
    },
  };

  const query = { ...definitions, ...baseQuery };

  return query;
}

export default baseService;
