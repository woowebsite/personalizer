import { resolver } from 'graphql-sequelize';
import { Job, JobMeta } from '../../models';
import { metadataToField } from '../../utils/dataUtil';

export const Query = {
  job: resolver(Job, {
    before: async (findOptions, { where }, context) => {
      findOptions.where = where;
      return findOptions;
    },
    after: job => job,
  }),
  jobs: resolver(Job, {
    list: true,
    before: async (findOptions, { where }, context) => {
      findOptions.where = where;
      findOptions.order = [['createdAt', 'DESC']];
      findOptions.include = [{ model: JobMeta }];
      return findOptions;
    },
    after: async (jobs, args) => {
      const count = await Job.count(args.where);
      const rows = jobs.map(u => metadataToField(u, 'metadata'));
      
      return { rows, count };
    },
  }),
};
