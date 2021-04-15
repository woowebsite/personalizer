import { resolver } from 'graphql-sequelize';
import { TermTaxonomy } from '../../models';

export const Query = {
  termTaxonomy: resolver(TermTaxonomy, {
    before: async (findOptions, { where }, context) => {
      findOptions.where = where;
      return findOptions;
    },
    after: termTaxonomy => termTaxonomy,
  }),
  termTaxonomies: resolver(TermTaxonomy, {
    list: true,
    before: async (findOptions, { where }, context) => {
      findOptions.where = where;
      findOptions.order = [['taxonomy', 'ASC']];
      return findOptions;
    },
    after: async (termTaxonomies, args) => {
      const total = await TermTaxonomy.count(args.where);
      return { rows: termTaxonomies, count: total };
    },
  }),
};
