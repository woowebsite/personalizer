import { resolver } from 'graphql-sequelize';
import { ProductBaseMeta } from '../../models';
import to from 'await-to-js';

export const Mutation = {
  upsertProductBaseMetadata: resolver(ProductBaseMeta, {
    before: async (findOptions, { refId, metadata }, ctx) => {
      // Metadata
      if (refId && metadata) {
        const meta = metadata.map(x => ({
          ...x,
          productBaseId: refId,
        }));

        await ProductBaseMeta.bulkCreate(meta);
      }

      return findOptions;
    },
    after: productBaseMeta => {
      return productBaseMeta;
    },
  }),
};
