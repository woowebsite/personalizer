import { resolver } from 'graphql-sequelize';
import { Filter } from '../../models';

export const FilterMap = {
  user: resolver(Filter.associations.user),
};
