import { Term, TermMeta } from '../../models';

const termRepository = {
  upsert: async ({ data, metadata }) => {
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
};

export default termRepository;
