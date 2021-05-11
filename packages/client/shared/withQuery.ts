import { OperationVariables, QueryResult } from '@apollo/react-common';
import { QueryHookOptions, useQuery } from '@apollo/client';
import { DocumentNode } from 'graphql';
import NProgress from 'nprogress';
import { notification } from 'antd';

function withQuery<TData = any, TVariables = OperationVariables>(
  query: DocumentNode,
  options?: QueryHookOptions,
) {
  const result = useQuery(query, options);
  const { data, loading, error, refetch } = result;

  // console.log('query: ', query);
  // console.log('options: ', options);
  // browser code
  if (typeof window !== 'undefined') {
    if (loading) NProgress.start();
    if (data) NProgress.done();
  }

  if (error) {
    notification.error({
      message: 'Notification Title',
      description: error.message,
      placement: 'bottomLeft',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  }
  return result;
}

export default withQuery;
