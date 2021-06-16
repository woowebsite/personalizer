import { resolver } from 'graphql-sequelize';
import { Term, TermMeta } from '../../models';
import to from 'await-to-js';

export const Mutation = {
  upsertTerm: resolver(Term, {
    before: async (findOptions, { data, metadata }, ctx) => {
      const [term, createTerm] = await Term.upsert(data, {
        returning: true,
      });

      // Metadata
      if (term && metadata) {
        const meta = metadata.map(x => ({
          ...x,
          slug: x.name,
          term_id: term.id,
        }));

        await TermMeta.destroy({
          where: { term_id: term.id },
        });
        await TermMeta.bulkCreate(meta);
      }

      return term;
    },
    after: term => {
      return term;
    },
  }),
  deleteTerm: resolver(Term, {
    before: async (findOptions, { id }, ctx) => {
      TermMeta.destroy({
        where: { term_id: id },
      });
      const x = Term.destroy({
        where: { id: id },
      });
    },
    after: (term, args) => {
      if (term.id === args.id) return false;
      return true;
    },
  }),
};
