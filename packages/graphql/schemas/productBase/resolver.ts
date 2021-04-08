const { GraphQLScalarType, Kind } = require('graphql');
import { Query } from './productBase.query';
import { ProductBaseMap } from './productBase.map';
import { Mutation } from './productBase.mutation';

export const resolver = {
  Query: Query,
  ProductBase: ProductBaseMap,
  Mutation: Mutation,
};
