import { resolver } from 'graphql-sequelize';
import { TermTaxonomy } from '../../models';

export const TermTaxonomyMap = {
  term: resolver(TermTaxonomy.associations.term),
  jobTerms: resolver(TermTaxonomy.associations.jobTerms),
  userTerms: resolver(TermTaxonomy.associations.userTerms),
};
