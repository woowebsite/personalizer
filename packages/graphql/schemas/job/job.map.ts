import { resolver } from 'graphql-sequelize';
import { Job } from '../../models';

export const JobMap = {
  user: resolver(Job.associations.user),
};
