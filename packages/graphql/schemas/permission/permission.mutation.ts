import { resolver } from 'graphql-sequelize';
import { Permission } from '../../models';
import to from 'await-to-js';

export const Mutation = {
  upsertPermission: resolver(Permission, {
    before: async (findOptions, { data }, ctx) => {
      const [permission, created0] = await Permission.upsert(data, {
        returning: true,
      });

      findOptions.where = { id: permission.id };
      return findOptions;
    },
    after: permission => {
      return permission;
    },
  }),
};
