import React from 'react';
import { useIntl } from 'react-intl';

// components
import TableQuickEdit from 'components/TableQuickEdit';
import TableFilter from 'components/TableFilter';
import QuickForm from './QuickForm';
import FilterForm from './FilterForm';

import { columns } from './columns';
import jobService from 'services/jobService';
import StatusType from '~/models/StatusType';
import { defaultFilter } from './constants';

const JobTable = props => {
  // DEFINES
  const tableRef = React.useRef(null);
  const { formatMessage } = useIntl();
  const t = id => formatMessage({ id });
  const [upsertUser] = jobService.upsert();
  const [deleteJob] = jobService.delete();

  // EVENTS
  const handleDeleteJob = id => {
    deleteJob({
      variables: {
        user: {
          id: id,
          status: StatusType.Deactive,
        },
      },
    });
  };

  
 

  // RENDER
  const renderFilter = props => <FilterForm {...props} />;
  const renderTable = props => (
    <TableQuickEdit
      ref={tableRef}
      rowKey="id"
      mutation={jobService.upsert}
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
      columns={columns(t, handleDeleteJob)}
      {...props}
    />
  );

  return (
    <>
      <TableFilter
        modelName="Job"
        pluralName="Jobs"
        defaultFilter={defaultFilter}
        query={jobService.getAll}
        filterRender={props => renderFilter(props)}
        tableRender={props => renderTable(props)}
      />
    </>
  );
};

export default JobTable;
