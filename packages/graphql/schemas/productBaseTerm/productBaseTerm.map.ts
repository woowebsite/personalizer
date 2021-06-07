import { resolver } from 'graphql-sequelize';
import { ProductBaseTerm } from '../../models/productBaseTerm.model';

export const ProductBaseTermMap = {
  productBase: resolver(ProductBaseTerm.associations.productBase),
  termTaxonomy: resolver(ProductBaseTerm.associations.termTaxonomy),
};
