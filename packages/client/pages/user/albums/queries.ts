import gql from "graphql-tag";

export const CREATE_ALBUM = gql`
  mutation CreateAlbum($name: String, $description: String) {
    createAlbum(data: { name: $name, description: $description, userId: 5 }) {
      id
    }
  }
`;

export const GET_ALBUMS = gql`
  query GetAlbums($where: AlbumWhere) {
    getAlbums(where: $where) {
      id
      name
      description
    }
  }
`;

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      filename
    }
  }
`;
