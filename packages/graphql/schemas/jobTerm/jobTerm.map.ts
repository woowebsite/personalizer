import { resolver } from 'graphql-sequelize';
import { Job, JobTerm } from '../../models';

export const JobTermMap = {
  job: resolver(JobTerm.associations.job),
  assignee: resolver(JobTerm.associations.assignee),
  termTaxonomy: resolver(JobTerm.associations.termTaxonomy),
};
