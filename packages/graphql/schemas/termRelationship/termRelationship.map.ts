import { resolver } from 'graphql-sequelize';
import { TermRelationship } from '../../models';

export const TermRelationshipMap = {
  productBase: resolver(TermRelationship.associations.productBase),
  termTaxonomy: resolver(TermRelationship.associations.termTaxonomy),
};
