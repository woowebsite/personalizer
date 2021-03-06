import { resolver } from 'graphql-sequelize';
import { Album } from '../../models';

export const Query = {
  album: resolver(Album, {
    before: async (findOptions, { where }, { album }) => {
      findOptions.where = where;
      return findOptions;
    },
    after: (album) => {
      return album;
    },
  }),

  albums: resolver(Album, {
    list: true,
    before: async (findOptions, { where, limit, offset }, context) => {
      findOptions.where = where;
      findOptions.order = [['name', 'ASC']];
      return findOptions;
    },
    after: async (albums, args) => {
      const total = await Album.count(args.where);
      return { rows: albums, count: total };
    },
  }),
};
