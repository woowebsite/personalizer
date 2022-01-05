import { gql } from '@apollo/client';
import baseService from './baseService';
import withMutation from 'shared/withMutation';
import withQuery from 'shared/withQuery';
import baseQuery from './baseQuery';

export const accountQuery = baseQuery({
  name: 'Account',
  plural: 'Accounts',
});

const definitions = {
  
};

const accountService = baseService({
  name: 'Account',
  plural: 'Accounts',
  definitions,
});
export default accountService;
