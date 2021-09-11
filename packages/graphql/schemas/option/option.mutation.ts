import { resolver as rs } from 'graphql-sequelize';
import { Option } from '../../models';
import { upsertOptions } from './option.util';
import { Op } from 'sequelize';

export const Mutation = {
  upsertOption: rs(Option, {
    before: async (findOptions, { data }, ctx) => {
      await upsertOptions(data);
      findOptions.where = { key: { [Op.in]: data.map(x => x.key) } }; // select all updated Option
      return findOptions;
    },
    after: option => {
      return option;
    },
  }),

  deleteOption: rs(Option, {
    before: async (findOptions, { id }, ctx) => {
      Option.destroy({
        where: { id: id },
      });
    },
    after: (option, args) => {
      if (option.id === args.id) return false;
      return true;
    },
  }),
};
