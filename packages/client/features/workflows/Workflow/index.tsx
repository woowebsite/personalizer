import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { useIntl } from 'react-intl';
import NProgress from 'nprogress';
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
  onDragEnd?: any;
}
const WorkflowToday = forwardRef<any, WorkflowProps>((props, ref) => {
  // DECLARE
  const { formatMessage } = useIntl();
  const [eventBus, setEventBus] = useState(undefined);
  const { prior, onCardClick, onDragEnd } = props;
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

  const [upsertJob] = jobService.upsert({
    ignoreResults: true,
  });

  // METHODS
  useImperativeHandle(ref, () => ({
    filter: handleFilter,
  }));

  const handleFilter = values => {
    const hasValue = Object.values(values).some(x => x !== undefined);
    if (hasValue) refetch({ where: { ...priorConditions, ...values } });
    else refetch();
  };

  // browser code
  if (typeof window !== 'undefined') {
    if (loading) NProgress.start();
    if (data) NProgress.done();
  }

  // EVENTS
  const handleDragEnd = (cardId, sourceLandId, targetLaneId, card) => {
    upsertJob({
      variables: {
        job: {
          id: cardId,
        },
        taxonomies: [targetLaneId],
      },
    });

    // eventBus.publish({
    //   type: 'MOVE_CARD',
    //   fromLaneId: sourceLandId,
    //   toLaneId: targetLaneId,
    //   cardId,
    //   index: card,
    // });
  };

  // RENDER
  if (loading) return <div />;
  const workflows = cardDecorator(data.workflows);

  return (
    <>
      <Board
        className={props.hiddenLaneHeader ? 'hidden-lane-header' : null}
        components={{
          GlobalStyle: GlobalStyled,
          Card: MyCard,
          LaneHeader: MyLaneHeader,
        }}
        hideCardDeleteIcon={true}
        laneStyle={{ backgroundColor: '#e0e5ea' }}
        style={{ backgroundColor: 'inherit' }}
        cardDragClass={style.cardDragClass}
        onCardClick={onCardClick}
        handleDragEnd={handleDragEnd}
        data={JSON.parse(JSON.stringify(workflows))}
        cardDraggable={true}
        eventBusHandle={setEventBus}
      />
    </>
  );
});

export default WorkflowToday;
