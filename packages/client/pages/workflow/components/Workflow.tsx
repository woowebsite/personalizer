import React, { forwardRef, useImperativeHandle } from 'react';
import { useIntl } from 'react-intl';
import { Divider } from 'antd';
import NProgress from 'nprogress';
import { Layout, Button, PageHeader, Row, Col, Typography } from 'antd';
import Board from 'react-trello';

// components

// graphql
import jobService, { jobBaseQuery, jobQuery } from 'services/jobService';

// inner components
import style from '../style.module.scss';
import { MyCard, MyLaneHeader, GlobalStyled } from '../styled';
import moment from 'moment';

interface WorkflowProps {
  prior: moment.unitOfTime.StartOf;
}

const WorkflowToday = forwardRef<any, WorkflowProps>((props, ref) => {
  // DECLARE
  const { formatMessage } = useIntl();
  const { prior } = props;
  const t = id => formatMessage({ id });
  const priorConditions = {
    startDueDate: moment()
      .startOf(prior)
      .toString(),
    endDueDate: moment()
      .endOf(prior)
      .toString(),
  };
  const { data, loading, refetch } = jobService.getWorkflow({
    fetchPolicy: 'no-cache',
    variables: {
      where: priorConditions,
    },
  });

  useImperativeHandle(ref, () => ({
    filter: handleFilter,
  }));

  // browser code
  if (typeof window !== 'undefined') {
    if (loading) NProgress.start();
    if (data) NProgress.done();
  }

  if (loading) return <div />;

  // EVENTS
  const handleFilter = values => {
    const hasValue = Object.values(values).some(x => x !== undefined);
    if (hasValue) refetch({ where: { ...priorConditions, ...values } });
    else refetch();
  };

  // RENDER
  return (
    <>
      {data && data.workflows && (
        <Board
          components={{
            GlobalStyle: GlobalStyled,
            Card: MyCard,
            LaneHeader: MyLaneHeader,
          }}
          laneStyle={{ backgroundColor: '#f0f2f5' }}
          style={{ backgroundColor: 'inherit' }}
          cardDragClass={style.cardDragClass}
          data={JSON.parse(JSON.stringify(data.workflows))}
          cardDraggable={true}
        />
      )}
    </>
  );
});

export default WorkflowToday;
