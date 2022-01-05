import React, {
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import { useIntl } from 'react-intl';
import { notification, Table as AntdTable, TableProps } from 'antd';
import { MutationTuple, OperationVariables } from '@apollo/client';

import Button from "components/Button";

export declare type QuickForm<RecordType> = (
  record: RecordType,
  mutate: any,
) => React.ReactNode;
interface TableQuickEditProps<RecordType> extends TableProps<RecordType> {
  quickForm: QuickForm<RecordType>;
  mutation: (options?: any) => MutationTuple<any, OperationVariables>;
}

const TableQuickEdit = forwardRef<any, TableQuickEditProps<any>>(
  (props, ref) => {
    // DECLARES
    const { formatMessage } = useIntl();
    const t = id => formatMessage({ id });
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const { children, quickForm, columns, ...others } = props;

    // METHODS
    useImperativeHandle(ref, () => ({
      collapseAll,
    }));

    const collapseAll = () => setExpandedRowKeys([]);

    // HANDLERS
    const handleExpandedRowsChange = expanedRows => {
      setExpandedRowKeys(expanedRows);
    };

    const onSaveCompleted = () => {
      collapseAll();
      notification.success({
        message: t('messages.notification.success.message'),
        description: t('messages.notification.success.save'),
        placement: 'bottomLeft',
        onClick: () => {
          console.log('Notification Clicked!');
        },
      });
    };

    // GRAPHQL
    const [mutate] = props.mutation({
      onCompleted: onSaveCompleted,
    });

    // RENDER
    return (
      <AntdTable
        columns={columns}
        expandable={{
          expandedRowKeys: expandedRowKeys,
          onExpandedRowsChange: handleExpandedRowsChange,
          expandIcon: ({ onExpand, record }) => (
            <Button
              type="link"
              onClick={e => {
                onExpand(record, e!);
                e.stopPropagation();
              }}
            >
              {t('tableQuickEdit.btnQuickEdit')}
            </Button>
          ),
          expandIconColumnIndex: columns.length - 1,
          expandedRowRender: (record, index, intent, expanded) =>
            quickForm(record, mutate),
        }}
        {...others}
      >
        {children}
      </AntdTable>
    );
  },
);

export default TableQuickEdit;
