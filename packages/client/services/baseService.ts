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
    getAll: (options) => {
      const query = gql`
      query GetAll${plural}($where: ${name}Where, $limit: Int, $offset: Int) {
        ${plural.toLowerCase()}(where: $where, limit: $limit, offset: $offset) {
          ${model.fields
            .filter((field) => field.type.kind === 'SCALAR')
            .map((field) => field.name)}
        }
        pagination(where: $where) {
          total
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
    create: () => {
      const mutation = gql`
        mutation Create${name}($album: ${name}Input) {
          create${name}(
            data: $album
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
      const result = withMutation(mutation);
      return result;
    },
    delete: (id) => {
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
      const [mutate] = withMutation(mutation);
      return mutate({ variables: { id } });
    },
  };

  const query = { ...definitions, ...baseQuery };

  return query;
}

export default baseService;
