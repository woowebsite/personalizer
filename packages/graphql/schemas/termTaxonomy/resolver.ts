const { GraphQLScalarType, Kind } = require('graphql');
import { Query } from './termTaxonomy.query';
import { TermTaxonomyMap } from './termTaxonomy.map';
import { Mutation } from './termTaxonomy.mutation';

export const resolver = {
  Query: Query,
  TermTaxonomy: TermTaxonomyMap,
  Mutation: Mutation,
};
