import { resolver } from 'graphql-sequelize';
import { Job } from '../../models';

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
      findOptions.order = [['title', 'ASC']];
      return findOptions;
    },
    after: async (jobs, args) => {
      const total = await Job.count(args.where);
      return { rows: jobs, count: total };
    },
  }),
};
