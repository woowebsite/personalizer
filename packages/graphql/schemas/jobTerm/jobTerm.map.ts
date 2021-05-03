import { resolver } from 'graphql-sequelize';
import { Job, JobTerm } from '../../models';

export const JobTermMap = {
  job: resolver(JobTerm.associations.job),
  termTaxonomy: resolver(JobTerm.associations.termTaxonomy),
};
