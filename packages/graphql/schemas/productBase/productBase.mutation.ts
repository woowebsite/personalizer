import { resolver } from 'graphql-sequelize';
import { ProductBase } from '../../models';
import to from 'await-to-js';

export const Mutation = {
  upsertProductBase: resolver(ProductBase, {
    before: async (findOptions, { data }, ctx) => {
      const { currentUser } = ctx;
      const obj = { ...data, userId: currentUser.id };

      const [productBase, createProductBase] = await ProductBase.upsert(obj, {
        returning: true,
      });
      return productBase;
    },
    after: productBase => {
      return productBase;
    },
  }),
};
