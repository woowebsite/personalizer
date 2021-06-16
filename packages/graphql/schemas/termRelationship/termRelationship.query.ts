import { resolver } from 'graphql-sequelize';
import { TermMeta, TermRelationship, TermTaxonomy } from '../../models';
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
      const { entityId, entityType, taxonomy } = where;
      const whereTaxonomies = taxonomy ? { taxonomy } : {};
      findOptions.where = {
        entityId,
        entityType,
      };
      findOptions.include = [
        {
          model: TermTaxonomy,
          require: true,
          where: whereTaxonomies,
          include: [
            {
              model: Term,
              require: true,
              include: [{ model: TermMeta }],
            },
          ],
        },
      ];
      findOptions.order = [['orderBy', 'ASC']];
      return findOptions;
    },
    after: async (termRelationships, args) => {
      const total = await TermRelationship.count(args.where);
      return { rows: termRelationships, count: total };
    },
  }),
};
