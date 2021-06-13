const { GraphQLScalarType, Kind } = require('graphql');
import { TermMap } from './term.map';
import { Mutation } from './term.mutation';

export const resolver = {
  Term: TermMap,
  Mutation: Mutation,
};
