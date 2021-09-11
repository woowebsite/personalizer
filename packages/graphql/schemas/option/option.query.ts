import { resolver } from 'graphql-sequelize';
import { Option } from '../../models';

export const Query = {
  option: resolver(Option, {
    before: async (findOptions, { where }, { option }) => {
      findOptions.where = where;
      return findOptions;
    },
    after: (option) => {
      return option;
    },
  }),

  options: resolver(Option, {
    list: true,
    before: async (findOptions, { where, limit, offset }, context) => {
      findOptions.where = where;
      findOptions.order = [['key', 'ASC']];
      return findOptions;
    },
    after: async (options, args) => {
      const total = await Option.count(args.where);
      return { rows: options, count: total };
    },
  }),
};
