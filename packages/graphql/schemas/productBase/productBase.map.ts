import { resolver } from 'graphql-sequelize';
import { ProductBase } from '../../models';

export const ProductBaseMap = {
  user: resolver(ProductBase.associations.user),
  termRelationships: resolver(ProductBase.associations.termRelationships),
  metadata: resolver(ProductBase.associations.metadata),
};
