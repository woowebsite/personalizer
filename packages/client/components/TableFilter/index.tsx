import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useIntl } from 'react-intl';
import { Table as AntdTable, TableProps } from 'antd';
import Card from 'components/Card';
import filterService from 'services/filterService';
import { OperationVariables, QueryResult } from '@apollo/client';
import TabFilter from './components/TabFilter';

export declare type FilterForm<RecordType> = (
  record: RecordType,
) => React.ReactNode;

interface TableFilterProps<RecordType> extends TableProps<RecordType> {
  modelName: String;
  filterRender: (any) => React.ReactNode;
  tableRender: React.FunctionComponent<TableProps<RecordType>>;
  query: (any?) => QueryResult<any, OperationVariables>;
}

const TableFilter = forwardRef<any, TableFilterProps<any>>((props, ref) => {
  // DECLARES
  const { formatMessage } = useIntl();
  const { children, filterRender, tableRender, modelName, ...others } = props;
  const { data, loading, refetch } = props.query();

  const { data: tabs, loading: tabLoading } = filterService.getFiltersByModel({
    variables: { where: { model_name: modelName } },
  });
  const [selectedTab, setSelectedTab] = useState(1);

  // METHODS
  useImperativeHandle(ref, () => ({
    filter: handleFilter,
  }));

  // HANDLERS
  const handleFilter = values => {
    const hasValue = Object.values(values).some(x => x !== undefined);
    if (hasValue) refetch({ where: values });
    else refetch();
  };

  const handleTabChange = key => {
    setSelectedTab(key);

    if (selectedTab === 1) refetch({ where: { status: selectedTab } });
    else refetch();
  };

  // RENDER
  if (loading) return <AntdTable />;

  return (
    <>
      <Card>
        {tabs && (
          <TabFilter
            onChange={handleTabChange}
            activeTab={selectedTab}
            tabs={tabs.filters.rows}
          />
        )}
        <div className="filter-form-wrapper">
          {filterRender({ onFilter: handleFilter })}
        </div>
        <div className="table-wrapper">
          {tableRender({ dataSource: data && data.users.rows })}
        </div>
      </Card>
    </>
  );
});

export default TableFilter;
