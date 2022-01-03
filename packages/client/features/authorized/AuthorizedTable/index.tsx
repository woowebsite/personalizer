import React from 'react';
import { useIntl } from 'react-intl';
import { Table } from 'antd';

// components
import { columns } from './columns';
import TableFilter from 'components/TableFilter';
import FilterForm from './FilterForm';
import {
  defaultFilter,
  PermissionActions,
  PermissionFullAccessCode,
} from './constants';
import { enumToDitionary } from 'shared/enumHelper';

// graphql
import permissionService from 'services/permissionService';

const AuthorizedTable = () => {
  // DEFINES
  const { formatMessage } = useIntl();
  const t = id => formatMessage({ id });
  const [upsertPermission] = permissionService.upsert();

  // EVENTS
  const onCheckboxChanged = (record, action, e) => {
    const sum = e.target.checked
      ? record.code + action.id
      : record.code - action.id;

    upsertPermission({
      variables: {
        permission: {
          id: record.id,
          code: sum,
        },
      },
    });
  };

  const onCheckAllChanged = (record, e) => {
    const code = e.target.checked ? PermissionFullAccessCode : 0;
    upsertPermission({
      variables: {
        permission: {
          id: record.id,
          code,
        },
      },
    });
  };

  // RENDER
  const renderFilter = props => <FilterForm {...props} />;
  const renderTable = props => {
    const { dataSource, ...rest } = props;
    return (
      <Table
        rowKey="id"
        dataSource={transformData(props.dataSource)}
        columns={columns(t, onCheckboxChanged, onCheckAllChanged)}
        {...rest}
      />
    );
  };

  const transformData = (dataSource): any[] => {
    const rows = dataSource?.map(p => {
      const bitFields = enumToDitionary(PermissionActions).reduce(
        (obj, x) => ({
          ...obj,
          [x.name]: p.code & x.id, // convert int to bit
        }),
        {},
      );
      return {
        ...p,
        ...bitFields,
      };
    });

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
