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
    after: user => {
      return user;
    },
  }),

  upsertUser: resolver(User, {
    before: async (findOptions, { data }) => {
      const [user0, created0] = await User.upsert(data, { returning: true });
      return user0;
    },
    after: user => {
      user.login = true;
      return user;
    },
  }),

  changePassword: resolver(User, {
    before: (users, { currentPassword, password }, ctx) => {
      const { currentUser } = ctx;
      return User.findOne({ where: { id: currentUser.id } });
    },
    after: async (authUser, { currentPassword, password }) => {
      try {
        // first change password
        if (!authUser.password) {
          authUser.update({ password });
          return { result: true };
        }
        // change password
        else {
          const [a, user] = await to(authUser.comparePassword(currentPassword));
          if (user) {
            authUser.update({ password });
            return { result: true };
          } else {
            return { result: false };
          }
        }
      } catch (error) {
        console.log('Sequelize error: ', error);
      }
    },
  }),
};
