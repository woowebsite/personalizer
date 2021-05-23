import { resolver } from 'graphql-sequelize';
import { Sequelize } from 'sequelize';
import { Op } from 'sequelize';
import {
  Job,
  JobMeta,
  JobTerm,
  sequelize,
  TermTaxonomy,
  User,
} from '../../models';
import { Term } from '../../models/term.model';
import { metadataToField, taxonomyToField } from '../../utils/dataUtil';

export const Query = {
  job: resolver(Job, {
    before: async (findOptions, { where }, context) => {
      const { job } = where;
      findOptions.where = job;
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

        // metadata
        let include: Array<any> = [{ model: JobMeta }];

        // taxonomies
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
  jobTerms: resolver(JobTerm, {
    list: true,
    before: async (findOptions, { where }, context) => {
      const { job, taxonomyNames } = where;

      findOptions.where = {
        ref_id: job.id,
        id: {
          [Op.in]: Sequelize.literal(
            `(SELECT DISTINCT a.id FROM JobTerms a
            INNER JOIN (SELECT id, MAX(updatedAt) latestUpdated
            FROM JobTerms WHERE ref_id=${
              job.id
            } GROUP BY term_taxonomy_id) b ON a.updatedAt = b.latestUpdated
            WHERE ref_id=${job.id})`,
          ),
        },
      };

      findOptions.include = [
        {
          model: TermTaxonomy,
          where: { taxonomy: taxonomyNames || [] },
          require: true,
          include: [
            {
              model: Term,
              require: true,
            },
          ],
        },
        { model: User },
      ];
      return findOptions;
    },
  }),
  workflows: resolver(TermTaxonomy, {
    list: true,
    before: async (findOptions, { where }, context) => {
      // Find
      findOptions.where = { taxonomy: 'job_status' };

      let query: any = {};
      if (where && where.title) query.title = { [Op.like]: where.title };

      if (where && where.startDueDate && where.endDueDate) {
        query.dueDate = {
          [Op.between]: [where.startDueDate, where.endDueDate],
        };
      }

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
              include: [
                { model: JobMeta, where: where.metadata },
                {
                  model: JobTerm,
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
              ],
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
          cards: x.dataValues.jobTerms.map(x => {
            if (x) {
              const jobTransfer = taxonomyToField(x.dataValues.job, 'jobTerms');
              return jobTransfer;
            }
          }),
        };
      });

      return { lanes };
    },
  }),
};
