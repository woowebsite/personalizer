import gql from "graphql-tag";

export const CREATE_ALBUM = gql`
  mutation CreateAlbum($name: String, $description: String, $image: String) {
    createAlbum(data: { name: $name, description: $description, userId: 2, image: $image }) {
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
    }
    getPagination(where: $where) {
      total
    }
  }
`;

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      id,
      path,
      filename
    }
  }
`;
