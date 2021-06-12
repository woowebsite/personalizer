import { resolver } from 'graphql-sequelize';
import { ProductBase, TermRelationship } from '../../models';
import to from 'await-to-js';
import EntityType from '../../constants/EntityType';

export const Mutation = {
  upsertProductBase: resolver(ProductBase, {
    before: async (findOptions, { data, taxonomies }, ctx) => {
      const { currentUser } = ctx;
      const obj = { ...data, userId: currentUser.id };

      const [productBase, createProductBase] = await ProductBase.upsert(obj, {
        returning: true,
      });

      // Update taxonomyRelationship
      if (productBase && taxonomies) {
        const pdterms = taxonomies.map(taxonomy => ({
          taxonomyId: taxonomy,
          entityId: productBase.id,
          entityType: EntityType.ProductBase,
        }));
        await TermRelationship.bulkCreate(pdterms);
      }

      return productBase;
    },
    after: productBase => {
      return productBase;
    },
  }),
};
