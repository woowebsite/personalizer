import { resolver } from 'graphql-sequelize';
import { Term } from '../../models';

export const TermMap = {
  metadata: resolver(Term.associations.metadata),
  termTaxonomy: resolver(Term.associations.termTaxonomy),
};
