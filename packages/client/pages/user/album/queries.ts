import { gql } from '@apollo/client';

export const GET_ALBUM = gql`
  query GetAlbum($where: AlbumWhere) {
    album(where: $where) {
      id
      name
      description
      image
    }
  }
`
