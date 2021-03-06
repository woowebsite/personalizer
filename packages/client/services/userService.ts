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
  
};

const userService = baseService({
  name: 'User',
  plural: 'Users',
  definitions,
});
export default userService;
