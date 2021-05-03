import React from 'react';
import { Layout, Button, PageHeader, Row, Col, Typography } from 'antd';
import Board from 'react-trello';

// components
import withAdminLayout from 'layout/AdminLayout';
import Card from 'components/Card';
import RedirectButton from '~/components/RedirectButton';

// graphql
import { withApollo } from 'apollo/apollo';
import { useRouter } from 'next/dist/client/router';
import jobService, { jobBaseQuery, jobQuery } from 'services/jobService';
import { fieldsToMetadata } from '~/shared/metadataHelper';

// inner components
import JobForm from '~/features/jobs/JobForm';
import JobStatus from '~/features/jobs/JobStatus';
import JobMoney from '~/features/jobs/JobMoney';
import style from './style.module.scss';
import { MyCard, MyLaneHeader, GlobalStyled } from './styled';
import FilterForm from './components/FilterForm';

const { Content } = Layout;

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

const Workflow = props => {
  // DECLARE
  const { messages, t, query, data } = props;
  const formRef: any = React.createRef();
  const formStatusRef: any = React.createRef();
  const [upsertJob] = jobService.upsert(); //(userQueries.UPSERT_USER);
  console.log(messages);

  // RENDER
  return (
    <>
      <PageHeader
        className="mb-4 pl-0 pr-0"
        title={messages.title}
        subTitle={messages.subTitle}
        extra={[
          <RedirectButton url={'/customer/jobs'}>
            {t('pageHeader.buttons.all')}
          </RedirectButton>,
          <Button key="2" danger>
            {t('buttons.delete')}
          </Button>,
          <RedirectButton url={'/customer/jobs/new'}>
            {t('buttons.create')}
          </RedirectButton>,
        ]}
      />

      <Content>
        <FilterForm />
        <Board
          components={{
            GlobalStyle: GlobalStyled,
            Card: MyCard,
            LaneHeader: MyLaneHeader,
          }}
          laneStyle={{ backgroundColor: '#f0f2f5' }}
          style={{ backgroundColor: 'inherit' }}
          cardDragClass={style.cardDragClass}
          data={data.workflows}
          cardDraggable={true}
        />
      </Content>
    </>
  );
};

export default withAdminLayout(withApollo({ ssr: true })(Workflow));

Workflow.getInitialProps = async ({ ctx }) => {
  const { res, req, query, pathname, apolloClient } = ctx;

  const { data, loading, refetch } = await apolloClient.query({
    query: jobQuery.getWorkflow,
  });

  return {
    query,
    data,
  };
};
