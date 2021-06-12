const { GraphQLScalarType, Kind } = require('graphql');
import { TermRelationshipMap } from './termRelationship.map';
import { Query } from './termRelationship.query';

export const resolver = {
  Query,
  TermRelationship: TermRelationshipMap,
};
