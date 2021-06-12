import { resolver } from 'graphql-sequelize';
import ProductBaseTaxonomy from '../../constants/ProductBaseTaxonomy';
import {
  ProductBase,
  ProductBaseMeta,
  TermRelationship,
  TermTaxonomy,
} from '../../models';
import { Term } from '../../models/term.model';
import { metadataToField, taxonomyToField } from '../../utils/dataUtil';
import { enum2ArrayValues } from '../../utils/enumUtil';

export const Query = {
  productBase: resolver(ProductBase, {
    before: async (findOptions, { where }, context) => {
      const productBaseTaxonomies = enum2ArrayValues(ProductBaseTaxonomy);

      findOptions.where = where;
      findOptions.include = [
        { model: ProductBaseMeta },
        {
          model: TermRelationship,
          require: true,
          include: [
            {
              model: TermTaxonomy,
              where: { taxonomy: productBaseTaxonomies },
              require: true,
              include: [
                {
                  model: Term,
                  require: true,
                },
              ],
            },
          ],
        },
      ];
      return findOptions;
    },
    after: productBase => {
      const transferData = metadataToField(productBase);
      const transferTerm = taxonomyToField(transferData, 'termRelationships');
      return transferTerm;
    },
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
