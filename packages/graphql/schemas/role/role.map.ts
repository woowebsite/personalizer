import { resolver } from 'graphql-sequelize';
import { Role } from '../../models';

export const RoleMap = {
  users: resolver(Role.associations.users),
  permissions: resolver(Role.associations.permissions),
};
