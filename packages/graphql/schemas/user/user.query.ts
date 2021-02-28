import { resolver } from 'graphql-sequelize';
import { User } from '../../models';
import to from 'await-to-js';

export const Query = {
  user: resolver(User, {
    before: async (findOptions, { where }, context) => {
      findOptions.where = where;
      return findOptions;
    },
    after: (user) => user,
  }),
  users: resolver(User, {
    before: async (findOptions, { where, limit, offset }, context) => {
      findOptions.where = where;
      findOptions.order = [['name', 'ASC']];
      return findOptions;
    },
    after: (users) => {
      return users;
    },
  }),
  loginUser: resolver(User, {
    before: async (findOptions, { email }) => {
      findOptions.where = { email };
      return findOptions;
    },
    after: async (user, { password }) => {
      let err;
      [err, user] = await to(user.comparePassword(password));
      if (err) {
        console.log(err);
        throw new Error(err);
      }

      user.login = true; //to let the directive know to that this user is authenticated without an authorization header
      return user;
    },
  }),
};
