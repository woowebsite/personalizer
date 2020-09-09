import { resolver as rs } from "graphql-sequelize";
import { Album } from "../../models";
import to from "await-to-js";
import * as fs from 'fs'

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
      createReadStream,
      filename,
      mimetype,
      encoding,
    } = await file;

    // 1. Validate file metadata.
    console.log('filename', filename)

    // 2. Stream file contents into cloud storage:
    // https://nodejs.org/api/stream.html
    fs.writeFile('images/' + filename, file, (err) => {
      if (err) throw err;

      // success case, the file was saved
      console.log('File saved!');
    })

    // 3. Record the file upload in your DB.
    // const id = await recordFile( … )

    return { filename, mimetype, encoding };
  },
};
