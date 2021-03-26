import React from 'react';
import { useIntl } from 'react-intl';

// components
import TableQuickEdit from 'components/TableQuickEdit';
import TableFilter from 'components/TableFilter';
import QuickForm from './QuickForm';
import FilterForm from './FilterForm';

import { columns } from './columns';
import userService from 'services/userService';

const UserTable = (props) => {
  // DEFINES
  const [upsertUser, result] = userService.upsert(); //(userQueries.UPSERT_USER);
  const { formatMessage } = useIntl();
  const t = (id) => formatMessage({ id });

  // EVENTS
  const handleSave = (values) => {
    upsertUser({
      variables: { user: values },
    });
  };

  // RENDER
  const renderFilter = (props) => <FilterForm {...props} />;
  const renderTable = (props) => (
    <TableQuickEdit
      {...props}
      rowKey='id'
      quickForm={(record) => <QuickForm values={record} onSave={handleSave} />}
      columns={columns(t)}
    />
  );

  return (
    <>
      <TableFilter
        query={userService.getAll}
        filterRender={(props) => renderFilter(props)}
        tableRender={(props) => renderTable(props)}
      />
    </>
  );
};

export default UserTable;
