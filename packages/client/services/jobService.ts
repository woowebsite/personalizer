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
        code
        title
        description
        dueDate
        publishDate
        link
        cost
        paid
        dept
        status
        isDemoColor
        isDemoLayout
        priority {
          name
          value
        }
        metadata {
          key
          type
          data
          value
        }
        customer {
          name
          value
        }
        employee {
          name
          value
        }
        leader {
          name
          value
        }
        job_status {
          name
          value
        }
      }

      jobTerms(where: $where) {
        id
        term_taxonomy_id
        order
        ref_id
        assignee_id
        updatedAt
        termTaxonomy {
          term {
            name
          }
        }
        assignee {
          id
          name
        }
      }
    }
  `,
  getWorkflow: gql`
    query GetWorkFlow($where: WorkflowWhere) {
      workflows(where: $where) {
        lanes {
          id
          title
          cards {
            id
            title
            code
            description
            priority {
              name
              value
            }
          }
        }
      }
    }
  `,
};

export const definitions = {
  getJob: options => {
    return withQuery(jobQuery.getJob, options);
  },
  getWorkflow: options => {
    return withQuery(jobQuery.getWorkflow, options);
  },
};

const jobService = baseService({
  name: 'Job',
  plural: 'Jobs',
  definitions,
});
export default jobService;
