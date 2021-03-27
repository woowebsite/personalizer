const { GraphQLScalarType, Kind } = require('graphql');
import { Query } from './filter.query';
import { FilterMap } from './filter.map';
import { Mutation } from './filter.mutation';

export const resolver = {
  Query: Query,
  Filter: FilterMap,
  Mutation: Mutation,
};
