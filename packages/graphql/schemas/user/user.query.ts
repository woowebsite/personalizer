import { resolver, attributeFields } from 'graphql-sequelize';
import { Op } from 'sequelize';
import { User } from '../../models';
import to from 'await-to-js';
import { metadataToField } from '../../utils/dataUtil';
import { UserMeta } from '../../models/userMeta.model';

export const Query = {
  user: resolver(User, {
    before: async (findOptions, { where }, context) => {
      findOptions.where = where;
      findOptions.include = [{ model: UserMeta }];
      return findOptions;
    },
    after: async (user, args, context) => {
      const total = await User.count(args.where);

      const transferData = metadataToField(user, 'metadata'); //user.map(u => metadataToField(u, 'userMeta'));
      return transferData;
    },
  }),
  users: resolver(User, {
    list: true,
    before: async (findOptions, { where, limit, offset }, context) => {
      let conditions: any = {};
      if (where && where.name) conditions.name = { [Op.like]: where.name };
      if (where && where.email) conditions.email = { [Op.like]: where.email };
      if (where && where.role_id) conditions.role_id = where.role_id;

      // metadata
      let include: Array<any> = [
        { model: UserMeta, require: false, where: where.metadata },
      ];

      findOptions.where = conditions;
      findOptions.order = [['name', 'ASC']];
      findOptions.include = include;
      return findOptions;
    },
    after: async (users, args, context) => {
      const total = await User.count(args.where);

      const transferData = users.map(u => metadataToField(u, 'metadata'));
      return {
        rows: transferData,
        count: total,
      };
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
