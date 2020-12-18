import { OperationVariables } from '@apollo/react-common';
import {
  MutationHookOptions,
  MutationTuple,
  useMutation,
} from '@apollo/client';
import { DocumentNode } from 'graphql';
import NProgress from 'nprogress';
import { notification } from 'antd';

function withMutation<TData = any, TVariables = OperationVariables>(
  mutation: DocumentNode
): MutationTuple<TData, TVariables> {
  const [mutate, result] = useMutation(mutation);
  const { data, loading, error } = result;
  // browser code
  if (typeof window !== 'undefined') {
    if (loading) NProgress.start();
    if (data) NProgress.done();
  }

  if (error) {
    notification.error({
      message: 'Notification Title',
      description: error.message,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  }

  return [mutate, result];
}

export default withMutation;
