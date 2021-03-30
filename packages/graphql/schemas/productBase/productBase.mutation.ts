import { resolver } from 'graphql-sequelize';
import { ProductBase } from '../../models';
import to from 'await-to-js';

export const Mutation = {
  upsertProductBase: resolver(ProductBase, {
    before: async (findOptions, { data }, ctx) => {
      let err, productBase;
      const { currentUser } = ctx;
      const obj = { ...data, userId: currentUser.id };

      [err, productBase] = await to(ProductBase.create(obj));
      if (err) {
        throw err;
      }
      findOptions.where = { id: productBase.id };
      return findOptions;
    },
    after: productBase => {
      return productBase;
    },
  }),
};
