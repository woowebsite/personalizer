import { resolver } from 'graphql-sequelize';
import { TermRelationship, TermTaxonomy } from '../../models';
import to from 'await-to-js';
import EntityType from '../../constants/EntityType';
import { Mutation as TermMutation } from '../term/term.mutation';
import termRepository from '../term/term.repository';
import termTaxonomyRepository from '../termTaxonomy/termTaxonomy.repository';
import termRelationshiopRepository from './termRelationship.repository';

export const Mutation = {
  upsertTermRelationship: resolver(TermRelationship, {
    before: async (
      findOptions,
      { entityId, entityType, taxonomy, term, termMeta },
      ctx,
    ) => {
      // Term upsert
      const newTerm = await termRepository.upsert({
        data: term,
        metadata: termMeta,
      });

      //TermTaxnomy upsert
      const newTermTaxonomy = await termTaxonomyRepository.upsert(
        taxonomy,
        newTerm.id,
      );

      //TermRelationship upsert
      const newTermRelationship = await termRelationshiopRepository.upsert(
        entityId,
        entityType,
        newTermTaxonomy.id,
      );

      return newTermRelationship;
    },
    after: termRelationship => {
      return termRelationship;
    },
  }),
};
