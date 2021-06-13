import { resolver } from 'graphql-sequelize';
import { Term } from '../../models';

export const TermMap = {
  termTaxonomy: resolver(Term.associations.termTaxonomy),
};
