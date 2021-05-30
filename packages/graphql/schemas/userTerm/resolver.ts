const { GraphQLScalarType, Kind } = require('graphql');
import { UserTermMap } from './userTerm.map';

export const resolver = {
  UserTerm: UserTermMap,
};
