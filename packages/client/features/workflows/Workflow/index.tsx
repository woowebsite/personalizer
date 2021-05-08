import React, { forwardRef, useImperativeHandle, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { Divider } from 'antd';
import NProgress from 'nprogress';
import { Layout, Button, PageHeader, Row, Col, Typography } from 'antd';
import Board from 'react-trello';

// components

// graphql
import jobService, { jobBaseQuery, jobQuery } from 'services/jobService';

// inner components
import style from './style.module.scss';
import { MyCard, MyLaneHeader, HiddenLaneHeader, GlobalStyled } from './styled';
import moment from 'moment';
import { cardDecorator } from './utils';

const dataWorkflow = {
  lanes: [
    {
      id: 'lane1',
      style: { backgroundColor: '#a5a9ae45' }, // Style of Lane
      title: 'Planned Tasks',
      label: '2/2',
      cards: [
        {
          id: 'Card1',
          title: 'Write Blog',
          description: 'Can AI make memes',
          label: '30 mins',
          draggable: false,
          className: 'card-important',
        },
        {
          id: 'Card2',
          title: 'Pay Rent',
          description: 'Transfer via NEFT',
          label: '5 mins',
          metadata: { sha: 'be312a1' },
        },
      ],
    },
    {
      id: 'lane2',
      title: 'Completed',
      label: '0/0',
      cards: [],
    },
  ],
};

interface WorkflowProps {
  prior: moment.unitOfTime.StartOf;
  hiddenLaneHeader?: boolean;
  onCardClick?: any;
}

const WorkflowToday = forwardRef<any, WorkflowProps>((props, ref) => {
  // DECLARE
  const { formatMessage } = useIntl();
  const { prior, onCardClick } = props;
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
  const workflows = cardDecorator(data.workflows);

  // EVENTS
  const handleFilter = values => {
    const hasValue = Object.values(values).some(x => x !== undefined);
    if (hasValue) refetch({ where: { ...priorConditions, ...values } });
    else refetch();
  };

  // RENDER
  return (
    <>
      <Board
        className={props.hiddenLaneHeader ? 'hidden-lane-header' : null}
        components={{
          GlobalStyle: GlobalStyled,
          Card: MyCard,
          LaneHeader: MyLaneHeader,
        }}
        laneStyle={{ backgroundColor: '#f0f2f5' }}
        style={{ backgroundColor: 'inherit' }}
        cardDragClass={style.cardDragClass}
        onCardClick={onCardClick}
        data={JSON.parse(JSON.stringify(workflows))}
        cardDraggable={true}
      />
    </>
  );
});

export default WorkflowToday;
