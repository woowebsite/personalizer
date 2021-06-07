const { GraphQLScalarType, Kind } = require('graphql');
import { ProductBaseTermMap } from './productBaseTerm.map';

export const resolver = {
  ProductBaseTerm: ProductBaseTermMap,
};
