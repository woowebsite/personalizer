import { resolver } from 'graphql-sequelize';
import { Job } from '../../models';
import to from 'await-to-js';
import { JobTerm } from '../../models/jobTerm.model';
import { JobMeta } from '../../models/jobMeta.model';

export const Mutation = {
  upsertJob: resolver(Job, {
    before: async (findOptions, { data, metadata , taxonomies}, ctx) => {
      const { currentUser } = ctx;
      const obj = { ...data, userId: currentUser.id };

      const [job, createJob] = await Job.upsert(obj, {
        returning: true,
      });

      // Update taxonomies
      if (job && taxonomies) {
        const terms = taxonomies.map(termId => ({
          term_taxonomy_id: termId,
          ref_id: job.id,
        }));
        await JobTerm.bulkCreate(terms);
      }

      // Metadata
      if (job && metadata) {
        const meta = metadata.map(x => ({
          ...x,
          job_id: job.id,
        }));

        await JobMeta.bulkCreate(meta);
      }
      findOptions.where = { id: job.id };
      return findOptions;
    },
  }),
};
