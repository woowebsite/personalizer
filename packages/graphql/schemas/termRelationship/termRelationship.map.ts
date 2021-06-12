import { resolver } from 'graphql-sequelize';
import { TermRelationship } from '../../models';

export const TermRelationshipMap = {
  termTaxonomy: resolver(TermRelationship.associations.termTaxonomy),
};
