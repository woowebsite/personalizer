import { resolver } from 'graphql-sequelize';
import { Job } from '../../models';
import to from 'await-to-js';
import { JobTerm } from '../../models/jobTerm.model';
import { JobMeta } from '../../models/jobMeta.model';
import JobTaxonomy from '../../constants/JobTaxonomy';
import {
  getJobStatusByTaxonomies,
  upsertMetadata,
  upsertTaxonomies,
} from './job.utils';
import JobStatus from '../../constants/jobStatus';

export const Mutation = {
  upsertJob: resolver(Job, {
    before: async (findOptions, { data, metadata, taxonomies }, ctx) => {
      const { currentUser } = ctx;

      const [job, createJob] = await Job.upsert(data, {
        returning: true,
      });

      // 1. Update some fields after create new a job
      if (!job.code) {
        const updateCodeJob: any = {
          id: job.getDataValue('id'),
          code: `C${currentUser.id}J${job.id}`,
          userId: currentUser.id,
        };
        // Customer
        metadata.push({
          data: JSON.stringify({
            value: currentUser.id,
            name: currentUser.name,
          }),
          type: 'object',
          key: 'customer',
          value: currentUser.id,
        });
        Job.upsert(updateCodeJob);

        // JobTerm
        const jt: any = {
          term_taxonomy_id: JobTaxonomy.New,
          ref_id: job.id,
          assignee_id: null,
          version: 1,
          latestVersion: 1,
        };
        JobTerm.create(jt);
      }
      // Update job status by Taxonomies
      else if (taxonomies && taxonomies.length) {
        const updateCodeJob: any = {
          id: job.getDataValue('id'),
          status: getJobStatusByTaxonomies(taxonomies, job.status),
        };
        Job.upsert(updateCodeJob);
      }

      // 2. Update taxonomies
      const jobMeta = await JobMeta.findOne({
        where: { job_id: job.id, key: 'employee' },
      });

      const assignee = metadata
        ? metadata.find(x => x.key === 'employee') || jobMeta
        : jobMeta;

      if (job && taxonomies) {
        const old_jobTerms = await JobTerm.findAll({
          where: { ref_id: job.id },
          raw: true,
        });
        const jobTerms = taxonomies.map(id => {
          return {
            term_taxonomy_id: id,
            ref_id: job.id,
            assignee_id: assignee ? assignee.value : null, // assignee_id must be not null
            version: 1,
            latestVersion: 1,
          };
        });

        upsertTaxonomies(jobTerms, old_jobTerms, job.id);
      }

      // 4. Metadata
      if (job && metadata) {
        const old_jobMeta = await JobMeta.findAll({
          where: { job_id: job.id },
          raw: true,
        });
        upsertMetadata(metadata, old_jobMeta, job.id);
      }
      findOptions.where = { id: job.id };
      return findOptions;
    },
  }),

  deleteJob: resolver(Job, {
    before: async (findOptions, { id }, ctx) => {
      JobMeta.destroy({
        where: { job_id: id },
      });
      JobTerm.destroy({
        where: { ref_id: id },
      });
      Job.destroy({
        where: { id: id },
      });
    },
    after: (job, args) => {
      if (job.id === args.id) return false;
      return true;
    },
  }),
};
