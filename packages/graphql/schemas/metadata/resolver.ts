const { GraphQLScalarType, Kind } = require('graphql');
import { Query } from './metadata.query';
import { Mutation } from './metadata.mutation';

export const resolver = {
  Query: Query,
  Mutation: Mutation,
};
