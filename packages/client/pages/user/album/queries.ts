import { gql } from '@apollo/client';

export const GET_ALBUM = gql`
  query GetAlbum($where: AlbumWhere) {
    getAlbum(where: $where) {
      id
      name
      description
      image
    }
  }
`
