import { resolver } from 'graphql-sequelize';
import { Permission } from '../../models';
import { enumToDitionary } from '../../utils/enumUtil';
import PermissionActions from './constants';

export const Query = {
  permissions: resolver(Permission, {
    list: true,
    before: async (findOptions, { where }, context) => {
      findOptions.where = where;
      findOptions.order = [['featureName', 'ASC']];
      return findOptions;
    },
    after: async (permissions, args) => {
      const total = await Permission.count(args.where);
      return { rows: permissions, count: total };
    },
  }),
};
