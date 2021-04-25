import { resolver } from 'graphql-sequelize';
import { Job, JobTerm } from '../../models';

export const JobMap = {
  user: resolver(Job.associations.user),
  jobTerms: resolver(Job.associations.jobTerms),
};
