import { gql } from '@apollo/client';
import baseService from 'definitions/base-definitions';

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
};

const albumService = baseService({
  name: 'Album',
  plural: 'Albums',
  definitions,
});
export default albumService;

export const CREATE_ALBUM = gql`
  mutation CreateAlbum($album: AlbumInput) {
    createAlbum(
      data: $album
    ) {
      id
    }
  }
`;

export const GET_ALBUMS = gql`
  query GetAlbums($where: AlbumWhere, $limit: Int, $offset: Int) {
    getAlbums(where: $where, limit: $limit, offset: $offset) {
      id
      name
      description
      image
      localName @client
    }
    getPagination(where: $where) {
      total
    }
  }
`;

export const GET_ALBUM = gql`
  query GetAlbum($where: AlbumWhere) {
    album(where: $where) {
      id
      name
      description
    }
  }
`;

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      id
      path
      filename
    }
  }
`;
