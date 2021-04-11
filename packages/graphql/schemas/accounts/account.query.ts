import { resolver } from 'graphql-sequelize';
import { Op } from 'sequelize';
import { Account } from '../../models';
import to from 'await-to-js';

export const Query = {
  account: resolver(Account, {
    before: async (findOptions, { where }, { account }) => {
      findOptions.where = where;
      return findOptions;
    },
    after: (account) => {
      return account;
    },
  }),

  accounts: resolver(Account, {
    list: true,
    before: async (findOptions, { where, limit, offset }, context) => {
      findOptions.where = where;
      return findOptions;
    },
    after: async (accounts, args) => {
      const total = await Account.count(args.where);
      return { rows: accounts, count: total };
    },
  }),
};
