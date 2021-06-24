import React, { useEffect } from 'react';
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
import JobTaxonomy from '~/models/JobTaxonomy';

const JobTable = props => {
  // DEFINES
  const tableRef = React.useRef(null);
  const tableFilterRef = React.useRef(null);
  const { formatMessage } = useIntl();
  const t = id => formatMessage({ id });
  const [updateJob] = jobService.upsert();
  const [deleteJob] = jobService.delete({
    onCompleted: () => {
      tableFilterRef.current.refetch();
    },
  });

  // EFFECTS
  useEffect(() => {
    tableFilterRef.current.refetch();
  }, []);

  // EVENTS
  const handleDeleteJob = id => {
    deleteJob({
      variables: {
        id,
      },
    });
  };

  const handleSendJob = id => {
    updateJob({
      variables: {
        job: { id },
        taxonomies: [JobTaxonomy.Todo],
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
              variables: values,
            })
          }
        />
      )}
      columns={columns(t, { delete: handleDeleteJob, send: handleSendJob })}
      {...props}
    />
  );

  return (
    <>
      <TableFilter
        ref={tableFilterRef}
        filterOptions={{
          modelName: 'Job',
        }}
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
