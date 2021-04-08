import { resolver } from 'graphql-sequelize';
import { ProductBase } from '../../models';

export const ProductBaseMap = {
  user: resolver(ProductBase.associations.user),
  // provider: resolver(ProductBase.associations.provider),
  // category: resolver(ProductBase.associations.category),
  // primaryImage: resolver(ProductBase.associations.primaryImage),
};
