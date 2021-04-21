import { gql } from '@apollo/client';
import baseService from './baseService';
import withMutation from 'shared/withMutation';
import withQuery from 'shared/withQuery';
import baseQuery from './baseQuery';

export const jobQuery = baseQuery({
  name: 'Job',
  plural: 'Jobs',
});

const definitions = {
 
};

const jobService = baseService({
  name: 'Job',
  plural: 'Jobs',
  definitions,
});
export default jobService;
