import { resolver } from 'graphql-sequelize';
import { ProductBaseMeta } from '../../models';

export const Query = {
  productBaseMetadata: resolver(ProductBaseMeta, {
    list: true,
    before: async (findOptions, { where }, context) => {
      findOptions.where = where;
      findOptions.order = [['title', 'ASC']];
      return findOptions;
    },
    after: async (productBaseMetadata, args) => {
      const total = await ProductBaseMeta.count(args.where);
      return { rows: productBaseMetadata, count: total };
    },
  }),
};
