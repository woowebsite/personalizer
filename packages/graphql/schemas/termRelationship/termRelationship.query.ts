import { resolver } from 'graphql-sequelize';
import { TermRelationship, TermTaxonomy } from '../../models';
import { Term } from '../../models/term.model';
import { metadataToField } from '../../utils/dataUtil';

export const Query = {
  termRelationship: resolver(TermRelationship, {
    before: async (findOptions, { where }, context) => {
      findOptions.where = where;
      return findOptions;
    },
    after: termTaxonomy => termTaxonomy,
  }),
  termRelationships: resolver(TermRelationship, {
    list: true,
    before: async (findOptions, { where }, context) => {
      findOptions.where = where;
      findOptions.include = [
        {
          model: TermTaxonomy,
          require: true,
          include: [
            {
              model: Term,
              require: true,
            },
          ],
        },
      ];
      findOptions.order = [['orderBy', 'ASC']];
      return findOptions;
    },
    after: async (termRelationships, args) => {
      return termRelationships;
    },
  }),
};
