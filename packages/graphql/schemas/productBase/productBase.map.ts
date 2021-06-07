import { resolver } from 'graphql-sequelize';
import { ProductBase } from '../../models';

export const ProductBaseMap = {
  user: resolver(ProductBase.associations.user),
  productBaseTerms: resolver(ProductBase.associations.productBaseTerms),
  metadata: resolver(ProductBase.associations.metadata),
};
