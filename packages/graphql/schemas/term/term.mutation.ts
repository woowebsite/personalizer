import { resolver } from 'graphql-sequelize';
import { TermTaxonomy } from '../../models';
import to from 'await-to-js';

export const Mutation = {
  upsertTermTaxonomy: resolver(TermTaxonomy, {
    before: async (findOptions, { data }, ctx) => {
      const [termTaxonomy, createTermTaxonomy] = await TermTaxonomy.upsert(
        data,
        {
          returning: true,
        },
      );
      return termTaxonomy;
    },
    after: termTaxonomy => {
      return termTaxonomy;
    },
  }),
};
