import { gql } from '@apollo/client';
import baseService from './baseService';
import withMutation from 'shared/withMutation';
import withQuery from 'shared/withQuery';
import baseQuery from './baseQuery';

export const jobBaseQuery = baseQuery({
  name: 'Job',
  plural: 'Jobs',
});

export const jobQuery = {
  getJob: gql`
    query GetJob($where: JobWhere) {
      job(where: $where) {
        id
        title
        description
        dueDate
        publishDate
        link
        job_priority {
          name
          value
        }
        job_status {
          name
          value
        }
      }
    }
  `,
};

const jobService = baseService({
  name: 'Job',
  plural: 'Jobs',
  definitions: jobQuery,
});
export default jobService;
