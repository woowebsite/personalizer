import { resolver } from 'graphql-sequelize';
import { ProductBaseMeta, User } from '../../models';

export const ProductBaseMetaMap = {
    productBase: resolver(ProductBaseMeta.associations.productBase),
};