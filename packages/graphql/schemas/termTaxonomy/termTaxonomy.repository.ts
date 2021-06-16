import { TermTaxonomy } from '../../models';

const termTaxonomyRepository = {
  upsert: async (taxonomy: string, term_id: number) => {
    const findObj = await TermTaxonomy.findOne({
      where: { taxonomy, term_id },
    });
    const old = findObj || {};
    const data: any = {
      ...old,
      taxonomy,
      slug: taxonomy,
      term_id,
    };
    const [termTaxonomy, createTermTaxonomy] = await TermTaxonomy.upsert(data, {
      returning: true,
    });
    return termTaxonomy;
  },
};

export default termTaxonomyRepository;
