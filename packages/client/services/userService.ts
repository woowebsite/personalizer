import { gql } from '@apollo/client';
import baseService from './baseService';
import withMutation from 'shared/withMutation';
import withQuery from 'shared/withQuery';

const definitions = {
  getAlbumsByUser: options => {
    const query = gql`
      query GetAlbum($where: AlbumWhere) {
        album(where: $where) {
          id
          name
          description
        }
      }
    `;

    return withQuery(query, options);
  },
};

const userService = baseService({
  name: 'User',
  plural: 'Users',
  definitions,
});
export default userService;
