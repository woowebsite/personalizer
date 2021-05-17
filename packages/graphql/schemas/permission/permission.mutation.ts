import { resolver } from 'graphql-sequelize';
import { Permission } from '../../models';
import to from 'await-to-js';

export const Mutation = {
  upsertPermission: resolver(Permission, {
    before: async (findOptions, { data }, ctx) => {
      let err, permission;
      const { currentUser } = ctx;
      const obj = { ...data, userId: currentUser.id };

      [err, permission] = await to(Permission.create(obj));
      if (err) {
        throw err;
      }
      findOptions.where = { id: permission.id };
      return findOptions;
    },
    after: permission => {
      return permission;
    },
  }),
};
