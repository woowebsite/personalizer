import * as fs from 'fs';
import shortid from 'shortid';
import mkdirp from 'mkdirp';

// const UPLOAD_DIR = './images'
const UPLOAD_DIR = '../client/public/images';
mkdirp.sync(UPLOAD_DIR);

const storeUpload = ({ stream, filename }) => {
  const id = shortid.generate();
  const path = `${UPLOAD_DIR}/${id}-${filename}`;

  return new Promise((resolve, reject) =>
    stream
      .on('error', (error) => {
        if (stream.truncated)
          // Delete the truncated file.
          fs.unlinkSync(path);
        reject(error);
      })
      .pipe(fs.createWriteStream(path))
      .on('error', (error) => reject(error))
      .on('finish', () => resolve({ id, path }))
  );
};

export const Mutation = {
  uploadFile: async (_, { file }) => {
    const { createReadStream, filename, mimetype, encoding } = await file;

    const stream = createReadStream();

    const upload: any = await storeUpload({ stream, filename });
    const { id, path } = upload;
    return { id, path, filename: `${id}-${filename}`, mimetype, encoding };
  },
};
