import { resolver } from 'graphql-sequelize';
import { Op } from 'sequelize';
import { Job, JobMeta, JobTerm, TermTaxonomy } from '../../models';
import { Term } from '../../models/term.model';
import { metadataToField, taxonomyToField } from '../../utils/dataUtil';

export const Query = {
  job: resolver(Job, {
    before: async (findOptions, { where }, context) => {
      findOptions.where = where;
      findOptions.include = [
        { model: JobMeta },
        {
          model: JobTerm,
          require: true,
          include: [
            {
              model: TermTaxonomy,
              where: { taxonomy: ['job_priority', 'job_status'] },
              require: true,
              include: [
                {
                  model: Term,
                  require: true,
                },
              ],
            },
          ],
        },
      ];

      return findOptions;
    },
    after: job => {
      const transferData = metadataToField(job);
      const transferTerm = taxonomyToField(transferData, 'jobTerms');
      return transferTerm;
    },
  }),
  jobs: resolver(Job, {
    list: true,
    before: async (findOptions, { where }, context) => {
      // Filters
      let conditions = where;
      let include: Array<any> = [{ model: JobMeta }];
      if (where && where.title) conditions.title = { [Op.like]: where.title };

      // Taxonomies
      console.log('where.taxonomies', where.taxonomies);
      if (where.taxonomies) {
        include.push({
          model: JobTerm,
          where: { term_taxonomy_id: where.taxonomies },
        });
      }

      // Find
      findOptions.where = conditions;
      findOptions.order = [['createdAt', 'DESC']];
      findOptions.include = include;

      return findOptions;
    },
    after: async (jobs, args) => {
      const count = await Job.count(args.where);
      const rows = jobs.map(u => metadataToField(u, 'metadata'));

      return { rows, count };
    },
  }),
};
