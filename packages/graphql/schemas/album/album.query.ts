import { resolver } from "graphql-sequelize";
import { Album } from "../../models";
import to from "await-to-js";

export const Query = {
  getAlbum: resolver(Album, {
    before: async (findOptions, {}, { album }) => {
      findOptions.where = { id: album.id };
      return findOptions;
    },
    after: (album) => {
      return album;
    },
  }),
  getAlbums: resolver(Album, {
    before: async (findOptions, { where, limit, offset }) => {
      findOptions.where = where;
      return findOptions;
    },
    after: (album) => {
      return album;
    },
  }),
};
