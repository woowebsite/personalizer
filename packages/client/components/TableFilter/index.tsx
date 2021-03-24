import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useIntl } from "react-intl";
import { Table as AntdTable, TableProps } from "antd";
import Card from "components/Card";

export declare type FilterForm<RecordType> = (
  record: RecordType
) => React.ReactNode;

interface TableFilterProps<RecordType> extends TableProps<RecordType> {
  filterFormRender: React.ReactNode;
  tableRender: React.ReactNode;
}

const TableFilter = forwardRef<any, TableFilterProps<any>>((props, ref) => {
  // DECLARES
  const { formatMessage } = useIntl();
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const { children, filterFormRender, tableRender, ...others } = props;

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
    <>
      <Card>
        <div className="filter-form-wrapper">{filterFormRender}</div>
        <div className="table-wrapper">{tableRender}</div>
      </Card>
    </>
  );
});

export default TableFilter;
