import { resolver as rs } from "graphql-sequelize";
import { Album } from "../../models";
import to from "await-to-js";
import * as fs from 'fs'
import shortid from 'shortid';
import mkdirp from 'mkdirp'

const UPLOAD_DIR = './images'
mkdirp.sync(UPLOAD_DIR)

const storeUpload = ({ stream, filename }) => {
  const id = shortid.generate()
  const path = `${UPLOAD_DIR}/${id}-${filename}`

  return new Promise((resolve, reject) =>
    stream
      .on('error', error => {
        if (stream.truncated)
          // Delete the truncated file.
          fs.unlinkSync(path)
        reject(error)
      })
      .pipe(fs.createWriteStream(path))
      .on('error', error => reject(error))
      .on('finish', () => resolve({ id, path }))
  )
}

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
      return findOptions;
    },
    after: (album) => {
      return album;
    },
  }),
  uploadFile: async (_, { file }) => {
    const {
      createReadStream,
      filename,
      mimetype,
      encoding,
    } = await file;

    const stream = createReadStream()

    const upload: any = await storeUpload({ stream, filename })
    const { id, path } = upload;
    return { id, path, filename, mimetype, encoding };
  },

};
