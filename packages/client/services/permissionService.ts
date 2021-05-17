import { gql } from '@apollo/client';
import baseService from './baseService';
import withMutation from 'shared/withMutation';
import withQuery from 'shared/withQuery';
import baseQuery from './baseQuery';

export const permissionQuery = baseQuery({
  name: 'Permission',
  plural: 'Permissions',
});

const definitions = {
  
};

const permissionService = baseService({
  name: 'Permission',
  plural: 'Permissions',
  definitions,
});
export default permissionService;
