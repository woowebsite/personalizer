import { resolver } from 'graphql-sequelize';
import { Job } from '../../models';
import to from 'await-to-js';
import { JobTerm } from '../../models/jobTerm.model';
import { JobMeta } from '../../models/jobMeta.model';
import JobTaxonomy from '../../constants/JobTaxonomy';

export const Mutation = {
  upsertJob: resolver(Job, {
    before: async (findOptions, { data, metadata, taxonomies }, ctx) => {
      const { currentUser } = ctx;
      const obj = { ...data, userId: currentUser.id };

      const [job, createJob] = await Job.upsert(obj, {
        returning: true,
      });

      // create mode
      if (!job.code) {
        const updateCodeJob: any = {
          id: job.getDataValue('id'),
          code: `C${job.userId}J${job.id}`,
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
      }

      // Assignee
      const jobMeta = await JobMeta.findOne({
        where: { job_id: job.id, key: 'employee' },
      });

      const assignee = metadata
        ? metadata.find(x => x.key === 'employee') || jobMeta
        : jobMeta;

      // Update taxonomies
      if (job && taxonomies) {
        const allOldTaxonomies: JobTerm[] = await JobTerm.findAll({
          where: { ref_id: job.id },
          raw: true,
        });

        JobTerm.update(
          { latestVersion: allOldTaxonomies.length + 1 },
          {
            where: { ref_id: job.id },
          },
        );

        const terms = taxonomies.map(termId => {
          return {
            term_taxonomy_id: termId,
            ref_id: job.id,
            assignee_id: assignee ? assignee.value : null, // assignee_id must be not null
            version: allOldTaxonomies.length + 1,
            latestVersion: allOldTaxonomies.length + 1,
          };
        });

        await JobTerm.bulkCreate(terms);
      }

      // Create 'new' mode
      if (!data.id) {
        const jt: any = {
          term_taxonomy_id: JobTaxonomy.New,
          ref_id: job.id,
          assignee_id: null,
          version: 1,
          latestVersion: 1,
        };
        JobTerm.create(jt);
      }

      // Metadata
      if (job && metadata) {
        const meta = metadata.map(x => ({
          ...x,
          job_id: job.id,
        }));

        await JobMeta.destroy({
          where: { job_id: job.id },
        });
        await JobMeta.bulkCreate(meta);
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
