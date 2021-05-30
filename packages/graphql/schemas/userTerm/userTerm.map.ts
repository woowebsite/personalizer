import { resolver } from 'graphql-sequelize';
import { User, UserTerm } from '../../models';

export const UserTermMap = {
  user: resolver(UserTerm.associations.user),
  termTaxonomy: resolver(UserTerm.associations.termTaxonomy),
};
