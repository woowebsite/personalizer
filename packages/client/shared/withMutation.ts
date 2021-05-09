import { OperationVariables } from '@apollo/react-common';
import {
  MutationHookOptions,
  MutationTuple,
  useMutation,
} from '@apollo/client';
import { DocumentNode } from 'graphql';
import NProgress from 'nprogress';
import { notification } from 'antd';

const onCompletedDefault = () => {
  notification.success({
    message: 'Notification Success',
    description: 'Save successfully',
    placement: 'bottomLeft',
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
};

function withMutation<TData = any, TVariables = OperationVariables>(
  mutation: DocumentNode,
  options?: MutationHookOptions
): MutationTuple<TData, TVariables> {
  const [mutate, result] = useMutation(mutation, {
    ...options,
    onCompleted: (options && options.onCompleted) || onCompletedDefault,
  });
  const { data, loading, error } = result;

  // console.log('mutation: ', mutation);
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

  return [mutate, result];
}

export default withMutation;
