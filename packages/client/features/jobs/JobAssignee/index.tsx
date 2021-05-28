import React from 'react';
import { useIntl } from 'react-intl';
import { Table } from 'antd';

// components
import jobService from 'services/jobService';
import StatusType from '~/models/StatusType';
import { columns } from './columns';

const JobAssignee = props => {
  const { jobTerms } = props;
  // DEFINES
  const { formatMessage } = useIntl();
  const t = id => formatMessage({ id });

  // EVENTS

  return (
    <>
      <Table columns={columns(t)} dataSource={jobTerms} />
    </>
  );
};

export default JobAssignee;
