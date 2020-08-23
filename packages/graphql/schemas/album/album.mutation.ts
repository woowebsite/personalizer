import { resolver as rs } from "graphql-sequelize";
import { Album } from "../../models";
import to from "await-to-js";

export const Mutation = {
  createAlbum: rs(Album, {
    before: async (findOptions, { data }) => {
      let err, album;
      [err, album] = await to(Album.create(data));
      if (err) {
        throw err;
      }
      findOptions.where = { id: album.id };
      return findOptions;
    },
    after: (album) => {
      return album;
    },
  }),
};
