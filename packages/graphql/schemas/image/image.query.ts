import { resolver } from "graphql-sequelize";
import { Album } from "../../models";
import to from "await-to-js";

export const Query = {
  getImage: resolver(Album, {
    before: async (findOptions, {}, { album }) => {
      findOptions.where = { id: album.id };
      return findOptions;
    },
    after: (album) => {
      return album;
    },
  }),
};
