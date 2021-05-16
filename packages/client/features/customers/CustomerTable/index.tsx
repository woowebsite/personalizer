import React from 'react';
import { useIntl } from 'react-intl';

// components
import TableQuickEdit from 'components/TableQuickEdit';
import TableFilter from 'components/TableFilter';
import QuickForm from './QuickForm';
import FilterForm from './FilterForm';

import { columns } from './columns';
import userService from 'services/userService';
import StatusType from '~/models/StatusType';
import { defaultFilter } from './constants';

// const
import CustomerMetaFields from 'models/CustomerMetaFields';
import { fieldsToMetadata } from '~/shared/metadataHelper';

const CustomerTable = props => {
  // DEFINES
  const tableRef = React.useRef(null);
  const { formatMessage } = useIntl();
  const t = id => formatMessage({ id });
  const [upsertUser] = userService.upsert();

  // EVENTS
  const handleDeleteUser = user_id => {
    upsertUser({
      variables: {
        user: {
          id: user_id,
          status: StatusType.Deactive,
        },
      },
    });
  };

  const onTypeChanged = (value, record, index, changedValue) => {
    upsertUser({
      variables: {
        user: {
          id: record.id,
        },
        metadata: fieldsToMetadata({
          [CustomerMetaFields.CustomerType]: changedValue,
        }),
      },
    });
  };

  // RENDER
  const renderFilter = props => <FilterForm {...props} />;
  const renderTable = props => (
    <TableQuickEdit
      ref={tableRef}
      rowKey="id"
      mutation={userService.upsert}
      quickForm={(record, mutate) => (
        <QuickForm
          values={record}
          onCancel={tableRef.current.collapseAll}
          onSave={values =>
            mutate({
              variables: { user: values },
            })
          }
        />
      )}
      columns={columns(t, handleDeleteUser, onTypeChanged)}
      {...props}
    />
  );

  return (
    <>
      <TableFilter
        filterOptions={{
          modelName: "Customer"
        }}
        modelName="User"
        pluralName="Users"
        defaultFilter={defaultFilter}
        query={userService.getAll}
        filterRender={props => renderFilter(props)}
        tableRender={props => renderTable(props)}
      />
    </>
  );
};

export default CustomerTable;
