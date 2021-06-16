const { GraphQLScalarType, Kind } = require('graphql');
import { TermRelationshipMap } from './termRelationship.map';
import { Query } from './termRelationship.query';
import { Mutation } from './termRelationship.mutation';

export const resolver = {
  Query,
  Mutation,
  TermRelationship: TermRelationshipMap,
};
