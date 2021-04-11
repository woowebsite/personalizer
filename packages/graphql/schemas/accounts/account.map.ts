import { resolver } from 'graphql-sequelize';
import { Account } from '../../models';

export const AccountMap = {
  user: resolver(Account.associations.user),
};
