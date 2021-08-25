import { resolver } from 'graphql-sequelize';
import { Sequelize } from 'sequelize';
import { Op } from 'sequelize';
import JobStatus from '../../constants/JobStatus';
import JobTaxonomy from '../../constants/JobTaxonomy';
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
              where: { taxonomy: ['job_status'] },
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
        // filter by current user
        let where2 = whereCurrentUser(ctx, where);

        // job
        let { job } = where2;
        job.status = job.status || { [Op.not]: JobStatus.Deactive }; // default not query Deleted job
        if (where2.job && where2.job.title)
          job.title = { [Op.like]: where2.job.title };

        if (job && job.startPublishDate && job.endPublishDate) {
          job.publishDate = {
            [Op.between]: [job.startPublishDate, job.endPublishDate],
          };
          delete job.startPublishDate;
          delete job.endPublishDate;
        }

        // metadata
        const whereMetadata = where2.metadata
          ? { [Op.and]: where2.metadata }
          : null;

        let include: Array<any> = [
          {
            model: JobMeta,
            where: whereMetadata,
          },
        ];

        // taxonomies
        if (where2.taxonomies && where2.taxonomies.length) {
          include.push({
            model: JobTerm,
            where: {
              term_taxonomy_id: where2.taxonomies,
            },
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

      // findOptions.logging = console.log;
      findOptions.where = {
        ref_id: job.id,
        id: {
          [Op.in]: Sequelize.literal(
            `( SELECT a.id FROM JobTerms a
            INNER JOIN (SELECT id, MAX(createdAt) latestUpdated
            FROM JobTerms WHERE ref_id=${
              job.id
            } GROUP BY term_taxonomy_id) b ON a.id = b.id )`,
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
    before: async (findOptions, { where: originalWhere }, context) => {
      // Find
      let where = whereCurrentUser(context, originalWhere);
      findOptions.where = {
        taxonomy: 'job_status',
        id: { [Op.not]: JobTaxonomy.New },
      };

      let jobQuery: any = {};
      if (where && where.title) jobQuery.title = { [Op.like]: where.title };

      if (where && where.startDueDate && where.endDueDate) {
        jobQuery.publishDate = {
          [Op.between]: [where.startDueDate, where.endDueDate],
        };
      }

      // Include
      const whereMetadata = where.metadata
        ? { [Op.and]: where.metadata }
        : null;

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
                { model: JobMeta, where: whereMetadata },
                {
                  model: JobTerm,
                  include: [
                    {
                      model: TermTaxonomy,
                      where: { taxonomy: ['job_status'] },
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
              `( SELECT a.id FROM JobTerms a 
                INNER JOIN (SELECT MAX(createdAt) latestUpdated FROM JobTerms GROUP BY ref_id) b 
                ON a.createdAt = b.latestUpdated  )`,
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
                // convert metadata into fields of job
                let metadataTransfer = metadataToField(x.dataValues.job);

                // convert jobTerms into fields of job
                let taxonomyTransfer = taxonomyToField(
                  metadataTransfer,
                  'jobTerms',
                );

                return taxonomyTransfer;
              }
            }),
        };
      });

      return { lanes };
    },
  }),
};
