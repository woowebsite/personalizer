import { resolver as rs } from 'graphql-sequelize';
import { Album } from '../../models';
import to from 'await-to-js';
import * as fs from 'fs';
import shortid from 'shortid';
import mkdirp from 'mkdirp';

const UPLOAD_DIR = './images';
mkdirp.sync(UPLOAD_DIR);

export const Mutation = {
  createAlbum: rs(Album, {
    before: async (findOptions, args, ctx) => {
      const { data } = args;
      const { currentUser } = ctx;
      const albumObj = { ...data, userId: currentUser.id };

      let err, album;
      [err, album] = await to(Album.create(albumObj));
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
