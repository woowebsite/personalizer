import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import { TableProps } from 'antd';
import NProgress from 'nprogress';
import Card from 'components/Card';
import filterService from 'services/filterService';
import { OperationVariables, QueryResult } from '@apollo/client';
import TabFilter from './components/TabFilter';
import camelCase from 'lodash/camelCase';
import { defaultConditions, FilterConfig } from './constants';

export declare type FilterForm<RecordType> = (
  record: RecordType,
) => React.ReactNode;

interface TableFilterProps<RecordType> extends TableProps<RecordType> {
  filterOptions: FilterConfig;
  modelName: string;
  pluralName: string;
  filterRender: (any) => React.ReactNode;
  tableRender: React.FunctionComponent<TableProps<RecordType>>;
  query: (any?) => QueryResult<any, OperationVariables>;
  defaultFilter?: any;
}

const TableFilter = forwardRef<any, TableFilterProps<any>>(
  ({ defaultFilter = defaultConditions, filterOptions, ...props }, ref) => {
    // DECLARES ================================================================================================
    const {
      filterRender,
      tableRender,
      pluralName,
    } = props;
    const { data, loading, refetch } = props.query({
      variables: { where: defaultFilter },
      notifyOnNetworkStatusChange: true
    });

    // tabs
    const [tabFilterCondition, setTabFilterCondition] = useState({});

    const { data: tabs } = filterService.getFiltersByModel(
      {
        variables: { where: { model_name: filterOptions.modelName } },
      },
    );
    const [selectedTab, setSelectedTab] = useState(0);

    useEffect(() => {
      refetch();
    }, [])

    useEffect(() => {
      loading ? NProgress.start() : NProgress.done();
    }, [loading])

    // METHODS ================================================================================================
    useImperativeHandle(ref, () => ({
      filter: handleFilter,
      refetch,
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
        refetch({ where: defaultFilter });
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
          {filterRender({ onFilter: handleFilter })}
          <div className="table-wrapper">
            {tableRender({
              dataSource: data && data[camelCase(pluralName)].rows,
            })}
          </div>
        </Card>
      </>
    );
  },
);

export default TableFilter;
