const { GraphQLScalarType, Kind } = require('graphql');
import { Query } from './account.query';
import { AccountMap } from './account.map';
import { Mutation } from './account.mutation';

export const resolver = {
  Query: Query,
  Account: AccountMap,
  Mutation: Mutation,
};
