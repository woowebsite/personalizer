import { resolver } from 'graphql-sequelize';
import { ProductBase } from '../../models';

export const Query = {
  productBase: resolver(ProductBase, {
    before: async (findOptions, { where }, context) => {
      findOptions.where = where;
      return findOptions;
    },
    after: productBase => productBase,
  }),
  productBases: resolver(ProductBase, {
    list: true,
    before: async (findOptions, { where }, context) => {
      findOptions.where = where;
      findOptions.order = [['title', 'ASC']];
      return findOptions;
    },
    after: async (productBases, args) => {
      const total = await ProductBase.count(args.where);
      return { rows: productBases, count: total };
    },
  }),
};
