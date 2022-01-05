import { gql } from '@apollo/client';
import baseService from './baseService';
import withMutation from 'shared/withMutation';

const definitions = {
  getAlbumsByUser: () => {
    return gql`
      query GetAlbum($where: AlbumWhere) {
        album(where: $where) {
          id
          name
          description
        }
      }
    `;
  },
  uploadImage: () => {
    const mutation = gql`
      mutation uploadFile($file: Upload!) {
        uploadFile(file: $file) {
          id
          path
          filename
        }
      }
    `;
    return withMutation(mutation);
  },
};

const albumService = baseService({
  name: 'Album',
  plural: 'Albums',
  definitions,
});
export default albumService;
