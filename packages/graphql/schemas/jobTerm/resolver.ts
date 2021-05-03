const { GraphQLScalarType, Kind } = require('graphql');
import { JobTermMap } from './jobTerm.map';

export const resolver = {
  JobTerm: JobTermMap,
};
