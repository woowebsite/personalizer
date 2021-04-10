import { gql } from '@apollo/client';
import baseService from './baseService';
import withMutation from 'shared/withMutation';
import withQuery from 'shared/withQuery';
import baseQuery from './baseQuery';

export const userQuery = baseQuery({
  name: 'User',
  plural: 'Users',
});

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

  changePassword: options => {
    const query = gql`
      mutation ChangePassword($currentPassword: String!, $password: String!) {
        changePassword(currentPassword: $currentPassword, password: $password) {
          result
        }
      }
    `;

    return withMutation(query, options);
  },
};

const userService = baseService({
  name: 'User',
  plural: 'Users',
  definitions,
});
export default userService;
