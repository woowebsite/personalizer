import { resolver } from 'graphql-sequelize';
import { Role } from '../../models';
import to from 'await-to-js';

export const Mutation = {
  createRole: resolver(Role, {
    before: async (findOptions, { data }) => {
      let err, role;
      [err, role] = await to(Role.create(data));
      if (err) {
        throw err;
      }
      findOptions.where = { id: role.id };
      return findOptions;
    },
    after: (role) => {
      return role;
    },
  }),
};
