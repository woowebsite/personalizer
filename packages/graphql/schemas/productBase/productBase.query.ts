import { resolver } from 'graphql-sequelize';
import { ProductBase, ProductBaseMeta, TermTaxonomy } from '../../models';
import { ProductBaseTerm } from '../../models/productBaseTerm.model';
import { Term } from '../../models/term.model';

export const Query = {
  productBase: resolver(ProductBase, {
    before: async (findOptions, { where }, context) => {
      findOptions.where = where;
      findOptions.include = [
        { model: ProductBaseMeta },
        {
          model: ProductBaseTerm,
          require: true,
          include: [
            {
              model: TermTaxonomy,
              where: { taxonomy: ['job_priority', 'job_status'] },
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
