import { resolver as rs } from "graphql-sequelize";
import { Album } from "../../models";
import to from "await-to-js";

export const Mutation = {
  createAlbum: rs(Album, {
    before: async (findOptions, args) => {
      const { data, ...other } = args;
      let err, album;
      [err, album] = await to(Album.create(data));
      if (err) {
        throw err;
      }
      findOptions.where = { id: album.id };

      //upload file
      console.log("arg", args);

      return findOptions;
    },
    after: (album) => {
      return album;
    },
  }),
  async uploadFile(parent, { file }) {
    const {
      stream,
      createReadStream,
      filename,
      mimetype,
      encoding,
    } = await file;
    const st = createReadStream();
    console.log("file", file);

    // 1. Validate file metadata.

    // 2. Stream file contents into cloud storage:
    // https://nodejs.org/api/stream.html

    // 3. Record the file upload in your DB.
    // const id = await recordFile( … )

    return { filename, mimetype, encoding };
  },
};
