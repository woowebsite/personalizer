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
import { whereCurrentUser } from '../../utils/queryUtil';

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
    before: async (findOptions, { where }, ctx) => {
      if (where) {
        // job
        let { job } = where;
        if (where.job && where.job.title)
          job.title = { [Op.like]: where.job.title };

        // filter by current user
        job = whereCurrentUser(ctx, job);

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
      const whereTaxonomies = taxonomyNames ? { taxonomy: taxonomyNames } : {};

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
          where: whereTaxonomies,
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
      findOptions.where = {
        taxonomy: 'job_status',
      };

      let jobQuery: any = {};
      if (where && where.title) jobQuery.title = { [Op.like]: where.title };

      if (where && where.startDueDate && where.endDueDate) {
        jobQuery.dueDate = {
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
              where: jobQuery,
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
      // get JobTerm that updatedAt is max
      const jobTerms = await JobTerm.findAll({
        where: {
          id: {
            [Op.in]: Sequelize.literal(
              `(SELECT DISTINCT a.id FROM JobTerms a
                INNER JOIN (SELECT ref_id, MAX(updatedAt) latestUpdated
                FROM JobTerms GROUP BY ref_id) b ON a.updatedAt = b.latestUpdated AND a.ref_id = b.ref_id)`,
            ),
          },
        },
        raw: true,
      });

      const latestJobTermIds = jobTerms.map(x => x.id);
      const lanes = termTaxonomies.map(x => {
        return {
          id: x.dataValues.id,
          title: x.dataValues.term.dataValues.name,
          cards: x.dataValues.jobTerms
            .filter(x => latestJobTermIds.includes(x.id))
            .map(x => {
              if (x) {
                const jobTransfer = taxonomyToField(
                  x.dataValues.job,
                  'jobTerms',
                );
                return jobTransfer;
              }
            }),
        };
      });

      return { lanes };
    },
  }),
};
