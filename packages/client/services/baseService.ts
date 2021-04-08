import gqlSchemas from './graphql.schema.json';
import { gql } from '@apollo/client';
import withMutation from 'shared/withMutation';
import withQuery from 'shared/withQuery';
import baseQuery from './baseQuery';
import _ from 'lodash';

const getModel = (modelName: string) => {
  const model = gqlSchemas.__schema.types.find(
    t => t.kind === 'OBJECT' && t.name === modelName,
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
  const baseGql = baseQuery({
    name,
    plural,
  });

  const baseDefinitions = {
    getAll: options => {
      return withQuery(baseGql.getAll, options);
    },
    get: options => {
      return withQuery(baseGql.get, options);
    },
    upsert: options => {
      return withMutation(baseGql.upsert, options);
    },
    create: () => {
      return withMutation(baseGql.create);
    },
    update: variables => {
      return withMutation(baseGql.update);
    },
    delete: () => {
      return withMutation(baseGql.delete);
    },
  };


  return { ...definitions, ...baseDefinitions };
}

export default baseService;
