import { resolve } from "bluebird";
import { GraphQLInt } from "graphql";
import { resolver } from "graphql-sequelize";
import { Album } from "../../models";

export const Query = {
  getAlbum: resolver(Album, {
    before: async (findOptions, { where }, { album }) => {
      findOptions.where = where;
      return findOptions;
    },
    after: (album) => {
      return album;
    },
  }),

  getAlbums: resolver(Album, {
    before: async (findOptions, { where, limit, offset }, context) => {
      // context.currentUser
      findOptions.where = where;
      findOptions.order = [['name', 'ASC']]
      return findOptions
    },
  }),

  getPagination: resolver(Album, {
    after: async (result, args) => {
      const total = await Album.count(args.where);
      return { total };
    }
  })
};
