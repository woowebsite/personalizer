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
  // DECLARES ================================================================================================
  const { children, filterRender, tableRender, modelName, ...others } = props;
  const { data, loading, refetch } = props.query();

  // tabs
  const [tabFilterCondition, setTabFilterCondition] = useState({});
  const { data: tabs, loading: tabLoading } = filterService.getFiltersByModel({
    variables: { where: { model_name: modelName } },
  });
  const [selectedTab, setSelectedTab] = useState(0);

  // METHODS ================================================================================================
  useImperativeHandle(ref, () => ({
    filter: handleFilter,
  }));

  // HANDLERS ================================================================================================
  const handleFilter = values => {
    const hasValue = Object.values(values).some(x => x !== undefined);
    const where = Object.assign(tabFilterCondition, values); // merge conditions and form values
    if (hasValue) refetch({ where: where });
    else refetch();
  };

  const handleTabChange = key => {
    setSelectedTab(key);
    if (key === '0') {
      // load all
      setTabFilterCondition({});
      refetch({ where: {} });
    } else {
      // load by tabs
      const conditions = JSON.parse(
        tabs.filters.rows.find(x => x.id === parseInt(key, 10)).conditions,
      );
      setTabFilterCondition(conditions);
      refetch({ where: conditions });
    }
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
