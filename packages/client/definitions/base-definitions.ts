import gqlSchemas from './graphql.schema.json';
import { gql } from '@apollo/client';
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
    getAll: () => gql`
      query GetAll${plural}($where: ${name}Where, $limit: Int, $offset: Int) {
        get${plural}(where: $where, limit: $limit, offset: $offset) {
          ${model.fields
            .filter((field) => field.type.kind === 'SCALAR')
            .map((field) => field.name)}
        }
        getPagination(where: $where) {
          total
        }
      }`,
    get: () => gql`
      query Get${name}($where: ${name}Where) {
        get${plural}(where: $where) {
          ${model.fields
            .filter((field) => field.type.kind === 'SCALAR')
            .map((field) => field.name)}
        }
    }`,
    create: () => gql`
      mutation Create${name}($album: ${name}Input) {
        create${name}(
          data: $album
        ) {
          id
        }
      }
    `,
    update: () => gql`
      mutation Update${name}(
        $data: ${name}Input
      ) {
        create${name}(
          data: $data
        ) {
          id
        }
      }
    `,
    delete: () => gql`
      mutation Delete${name}(
        $id: Int
      ) {
        delete${name}(
          id: $id
        ) {
          id
        }
      }
    `,
  };

  const query = { ...definitions, ...baseQuery };

  return query;
}

export default baseService;
