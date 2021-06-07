import { resolver } from 'graphql-sequelize';
import { TermTaxonomy } from '../../models';

export const TermTaxonomyMap = {
  term: resolver(TermTaxonomy.associations.term),
  userTerms: resolver(TermTaxonomy.associations.userTerms),
  productBaseTerms: resolver(TermTaxonomy.associations.productBaseTerms),
};
