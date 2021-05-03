import { resolver } from 'graphql-sequelize';
import { Sequelize } from 'sequelize';
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
      if (where) {
        // job
        let { job } = where;
        if (where && where.job.title)
          job.title = { [Op.like]: where.job.title };

        // taxonomies
        let include: Array<any> = [{ model: JobMeta }];
        if (where.taxonomies) {
          include.push({
            model: JobTerm,
            require: true,
            where: { term_taxonomy_id: where.taxonomies },
          });
        }

        // Find
        findOptions.where = job;
        findOptions.order = [['createdAt', 'DESC']];
        findOptions.include = include;
      }

      return findOptions;
    },
    after: async (jobs, args) => {
      const count = await Job.count(args.where);
      const rows = jobs.map(u => metadataToField(u, 'metadata'));

      return { rows, count };
    },
  }),
  workflows: resolver(TermTaxonomy, {
    list: true,
    before: async (findOptions, { where }, context) => {
      // Find
      let query: any = {};
      if (where && where.title) query.title = { [Op.like]: where.title };
      findOptions.where = { taxonomy: 'job_status' };

      // Include
      findOptions.include = [
        {
          model: Term,
        },
        {
          model: JobTerm,
          require: false, // right outerjoin
          include: [
            {
              model: Job,
              where: query,
            },
          ],
        },
      ];

      return findOptions;
    },
    after: async (termTaxonomies, args) => {
      const lanes = termTaxonomies.map(x => {
        return {
          id: x.dataValues.id,
          title: x.dataValues.term.dataValues.name,
          cards: x.dataValues.jobTerms.map(x => x.dataValues.job),
        };
      });

      return { lanes };
    },
  }),
};
