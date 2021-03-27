import { resolver } from 'graphql-sequelize';
import { Filter } from '../../models';

export const Query = {
  filters: resolver(Filter, {
    list: true,
    before: async (findOptions, { where }, context) => {
      findOptions.where = where;
      findOptions.order = [['title', 'ASC']];
      return findOptions;
    },
    after: async (filters, args) => {
      const total = await Filter.count(args.where);
      return { rows: filters, count: total };
    },
  }),
};
