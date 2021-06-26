import JobPriority from '~/models/JobPriority';

export const cardDecorator = workflows => {
  const getClass = priority => {
    switch (priority) {
      case JobPriority.Urgent.toString():
        return 'card-urgent';
      case JobPriority.High.toString():
        return 'card-high';
      case JobPriority.Normal.toString():
        return 'card-normal';
      case JobPriority.Low.toString():
        return 'card-low';
    }
  };
  const lanes = workflows.lanes.map(lane => ({
    ...lane,
    cards: lane.cards.map(card => ({
      ...card,
      className: card.priority ? getClass(card.priority.value) : null,
    })),
  }));
  return { lanes };
};
