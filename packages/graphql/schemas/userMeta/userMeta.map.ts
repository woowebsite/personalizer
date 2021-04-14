import { resolver } from 'graphql-sequelize';
import { User } from '../../models';
import { UserMeta } from '../../models/userMeta.model';

export const UserMetaMap = {
  user: resolver(UserMeta.associations.user),
};
