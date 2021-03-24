import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
} from "react";
import { useIntl } from "react-intl";
import { Table as AntdTable, TableProps } from "antd";

export declare type QuickForm<RecordType> = (
  record: RecordType
) => React.ReactNode;
interface TableQuickEditProps<RecordType> extends TableProps<RecordType> {
  quickForm: QuickForm<RecordType>;
}

const TableQuickEdit = forwardRef<any, TableQuickEditProps<any>>(
  (props, ref) => {
    // DECLARES
    const { formatMessage } = useIntl();
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const { children, quickForm, columns, ...others } = props;

    // METHODS
    useImperativeHandle(ref, () => ({
      collapseAll,
    }));

    const collapseAll = () => setExpandedRowKeys([]);

    // HANDLERS
    const handleExpandedRowsChange = (expanedRows) => {
      setExpandedRowKeys(expanedRows);
    };

    // RENDER
    return (
      <AntdTable
        columns={columns}
        expandable={{
          expandedRowKeys: expandedRowKeys,
          onExpandedRowsChange: handleExpandedRowsChange,
          expandIcon: ({ onExpand, record }) => (
            <a
              onClick={(e) => {
                onExpand(record, e!);
                e.stopPropagation();
              }}
            >
              {formatMessage({ id: "tableQuickEdit.btnQuickEdit" })}
            </a>
          ),
          expandIconColumnIndex: columns.length - 1,
          expandedRowRender: (record, index, intent, expanded) =>
            quickForm(record),
        }}
        {...others}
      >
        {children}
      </AntdTable>
    );
  }
);

export default TableQuickEdit;
