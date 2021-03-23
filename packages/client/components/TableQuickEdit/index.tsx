import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Table as AntdTable, TableProps } from "antd";

export declare type QuickForm<RecordType> = (
  record: RecordType
) => React.ReactNode;
interface TableQuickEditProps<RecordType> {
  quickForm: QuickForm<RecordType>;
  saving: boolean;
}

const TableQuickEdit: React.FC<TableProps<any> & TableQuickEditProps<any>> = (
  props
) => {
  const { formatMessage } = useIntl();
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const { children, quickForm, columns, saving, ...others } = props;

  useEffect(
    () => {
      if (saving === true) {
        setExpandedRowKeys([]);
      }
    },
    [saving]
  );

  const handleExpand = (expanded, record) => {
    // setExpandedRowKeys([1]);
  };

  const handleExpandedRowsChange = (expanedRows) => {
    setExpandedRowKeys(expanedRows);
  };
  return (
    <AntdTable
      columns={columns}
      expandable={{
        onExpand: handleExpand,
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
};

export default TableQuickEdit;
