import { resolver } from 'graphql-sequelize';
import { User } from '../../models';
import to from 'await-to-js';

export const UserMap = {
  role: resolver(User.associations.role),
  userMeta: resolver(User.associations.userMeta)
};
