import React from 'react';
import { useIntl } from 'react-intl';
import { Table } from 'antd';

// components
import { columns } from './columns';
import TableFilter from '~/components/TableFilter';
import permissionService from '~/services/permissionService';
import FilterForm from './FilterForm';
import { defaultFilter, PermissionActions } from './constants';
import { enumToDitionary } from '~/shared/enumHelper';

const AuthorizedTable = props => {
  // DEFINES
  const tableRef = React.useRef(null);
  const { formatMessage } = useIntl();
  const t = id => formatMessage({ id });

  // EVENTS

  // RENDER
  const renderFilter = props => <FilterForm {...props} />;
  const renderTable = props => {
    const { dataSource, ...rest } = props;
    return (
      <Table
        ref={tableRef}
        dataSource={transformData(props.dataSource)}
        rowKey="id"
        columns={columns(t, null, null)}
        {...rest}
      />
    );
  };

  const transformData = (dataSource): any[] => {
    const rows = dataSource.map(p => {
      const bitFields = enumToDitionary(PermissionActions).reduce(
        (obj, x) => ({
          ...obj,
          [x.name]: p.code & x.id,
        }),
        {},
      );
      return {
        ...p,
        ...bitFields,
      };
    });
    console.log('rows', rows);

    return rows;
  };

  return (
    <>
      <TableFilter
        filterOptions={{
          modelName: 'Permission',
        }}
        modelName="Permission"
        pluralName="Permissions"
        defaultFilter={defaultFilter}
        query={permissionService.getAll}
        filterRender={props => renderFilter(props)}
        tableRender={props => renderTable(props)}
      />
    </>
  );
};

export default AuthorizedTable;
