import { resolver } from 'graphql-sequelize';
import { TermTaxonomy } from '../../models';
import { Term } from '../../models/term.model';
import { metadataToField } from '../../utils/dataUtil';

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
      findOptions.include = [{ model: Term }];
      findOptions.order = [['order', 'ASC']];
      return findOptions;
    },
    after: async (termTaxonomies, args) => {
      const transferData = termTaxonomies.map((taxonomy: TermTaxonomy) => {
        taxonomy.setDataValue('termName', taxonomy.term.name);
        return taxonomy;
      });
      return {
        rows: transferData,
      };
    },
  }),
};
