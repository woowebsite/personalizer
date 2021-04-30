const { GraphQLScalarType, Kind } = require('graphql');
import { Query } from './job.query';
import { JobMap } from './job.map';
import { Mutation } from './job.mutation';

export const resolver = {
  Query: Query,
  Job: JobMap,
  Mutation: Mutation,
};
