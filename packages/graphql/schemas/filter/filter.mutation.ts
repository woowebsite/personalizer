import { resolver } from 'graphql-sequelize';
import { Filter } from '../../models';
import to from 'await-to-js';

export const Mutation = {
  upsertFilter: resolver(Filter, {
    before: async (findOptions, { data }, ctx) => {
      let err, filter;
      const { currentUser } = ctx;
      const obj = { ...data, userId: currentUser.id };

      [err, filter] = await to(Filter.create(obj));
      if (err) {
        throw err;
      }
      findOptions.where = { id: filter.id };
      return findOptions;
    },
    after: filter => {
      return filter;
    },
  }),
};
