import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useIntl } from 'react-intl';
import { Table as AntdTable, TableProps } from 'antd';
import Card from 'components/Card';
import userService from 'services/userService';
import { OperationVariables, QueryResult } from '@apollo/client';

export declare type FilterForm<RecordType> = (
  record: RecordType
) => React.ReactNode;

interface TableFilterProps<RecordType> extends TableProps<RecordType> {
  filterRender: (any) => React.ReactNode;
  tableRender: React.FunctionComponent<TableProps<RecordType>>;
  query: (any?) => QueryResult<any, OperationVariables>;
}

const TableFilter = forwardRef<any, TableFilterProps<any>>((props, ref) => {
  // DECLARES
  const { formatMessage } = useIntl();
  const { children, filterRender, tableRender, ...others } = props;
  const { data, loading, refetch } = props.query();

  // METHODS
  useImperativeHandle(ref, () => ({
    filter: handleFilter,
  }));

  // HANDLERS
  const handleFilter = (values) => {
    const hasValue = Object.values(values).some((x) => x !== undefined);
    if (hasValue) refetch({ where: values });
    else refetch();
  };

  // RENDER
  if (loading) return <AntdTable />;

  return (
    <>
      <Card>
        <div className='filter-form-wrapper'>
          {filterRender({ onFilter: handleFilter })}
        </div>
        <div className='table-wrapper'>
          {tableRender({ dataSource: data && data.users.rows })}
        </div>
      </Card>
    </>
  );
});

export default TableFilter;
