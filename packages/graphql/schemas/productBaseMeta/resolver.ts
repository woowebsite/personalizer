const { GraphQLScalarType, Kind } = require('graphql');
import { ProductBaseMetaMap } from './productBaseMeta.map';

export const resolver = {
  ProductBaseMeta: ProductBaseMetaMap,
};
