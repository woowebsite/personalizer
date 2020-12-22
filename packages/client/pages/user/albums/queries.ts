import { gql } from '@apollo/client';

export const CREATE_ALBUM = gql`
  mutation CreateAlbum($name: String, $description: String, $image: String) {
    createAlbum(
      data: { name: $name, description: $description, image: $image }
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
      localName @client
    }
    getPagination(where: $where) {
      total
    }
  }
`;

export const GET_ALBUM = gql`
  query GetAlbum($where: AlbumWhere) {
    getAlbum(where: $where) {
      id
      name
      description
    }
  }
`

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      id
      path
      filename
    }
  }
`;
