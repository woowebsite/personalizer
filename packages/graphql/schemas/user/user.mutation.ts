import { resolver } from 'graphql-sequelize';
import { User } from '../../models';
import to from 'await-to-js';

export const Mutation = {
  createUser: resolver(User, {
    before: async (findOptions, { data }) => {
      let err, user;
      [err, user] = await to(User.create(data));
      if (err) {
        throw err;
      }
      findOptions.where = { id: user.id };
      return findOptions;
    },
    after: (user) => {
      user.login = true;
      return user;
    },
  }),

  upsertUser: resolver(User, {
    before: async (findOptions, { data }) => {
      const [user0, created0] = await User.upsert(data, { returning: true });
      return user0;
    },
    after: (user) => {
      user.login = true;
      return user;
    },
  }),
};
