import { Query } from './role.query';
import { RoleMap } from './role.map';
import { Mutation } from './role.mutation';

export const resolver = {
  Query: Query,
  Role: RoleMap,
  Mutation: Mutation,
};
