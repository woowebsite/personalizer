import { resolver as rs } from "graphql-sequelize";
import { Album } from "../../models";
import to from "await-to-js";

export const Mutation = {
  createAlbum: rs(Album, {
    before: async (findOptions, arg) => {
      const { data, ...other } = arg
      let err, album;
      [err, album] = await to(Album.create(data));
      if (err) {
        throw err;
      }
      findOptions.where = { id: album.id };
      
      //upload file
      console.log('arg.file', arg.file)

      return findOptions;
    },
    after: (album) => {
      return album;
    },
  }),
};
