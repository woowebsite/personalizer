import { resolver } from 'graphql-sequelize';
import { Role } from '../../models';

export const RoleMap = {
  users: resolver(Role.associations.users),
};
