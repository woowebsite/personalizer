import React from 'react';
import { useIntl } from 'react-intl';

// components
import TableQuickEdit from 'components/TableQuickEdit';
import TableFilter from 'components/TableFilter';
import QuickForm from './QuickForm';
import FilterForm from './FilterForm';

import { columns } from './columns';
import userService from 'services/userService';

const UserTable = props => {
  // DEFINES
  const tableRef = React.useRef(null);
  const { formatMessage } = useIntl();
  const t = id => formatMessage({ id });

  // RENDER
  const renderFilter = props => <FilterForm {...props} />;
  const renderTable = props => (
    <TableQuickEdit
      {...props}
      ref={tableRef}
      rowKey="id"
      mutation={userService.upsert}
      quickForm={(record, mutate) => (
        <QuickForm
          values={record}
          onSave={values =>
            mutate({
              variables: { user: values },
            })
          }
        />
      )}
      columns={columns(t)}
    />
  );

  return (
    <>
      <TableFilter
        modelName="User"
        query={userService.getAll}
        filterRender={props => renderFilter(props)}
        tableRender={props => renderTable(props)}
      />
    </>
  );
};

export default UserTable;
