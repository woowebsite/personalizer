const { GraphQLScalarType, Kind } = require('graphql');
import { Query } from './permission.query';
import { PermissionMap } from './permission.map';
import { Mutation } from './permission.mutation';

export const resolver = {
  Query: Query,
  Permission: PermissionMap,
  Mutation: Mutation,
};
