import React, { useState } from 'react';
import { Divider } from 'antd';
import { Layout, Button, PageHeader, Row, Col, Typography } from 'antd';

// components
import withAdminLayout from 'layout/AdminLayout';
import RedirectButton from '~/components/RedirectButton';

// graphql
import { withApollo } from 'apollo/apollo';

// inner components
import FilterForm from 'features/workflows/FilterForm';
import JobDrawer from 'features/workflows/JobDrawer';
import WorkflowBoard from 'features/workflows/Workflow';
import DividerVertical from '~/features/workflows/DividerVertical';
import { hasPermission } from '~/shared/authHelper';
import workflowAuthConfig from '~/features/workflows/authorized/workflow';

const { Content } = Layout;

const Workflow = props => {
  // DECLARE
  const { messages, session, t, query } = props;
  const weekRef: any = React.useRef();
  const dayRef: any = React.useRef();
  const formRef: any = React.useRef();
  const jobDrawerRef: any = React.useRef();
  const [currentJobId, setCurrentJob] = useState(null);
  const isCardDraggable = hasPermission(
    workflowAuthConfig.CardDraggable,
    session,
  );

  // EVENTS
  const handleFilter = values => {
    weekRef.current.filter(values);
    dayRef.current.filter(values);
  };

  const showJobDetail = (jobId, metadata, laneId) => {
    setCurrentJob(jobId);
    if (jobDrawerRef.current) {
      jobDrawerRef.current.showDetail();
    }
  };

  const onSaveJobCompleted = () => {
    // reload workflow
    const filterValues = formRef.current.getFieldsValue();
    handleFilter(filterValues);
  };

  // RENDER
  return (
    <>
      <PageHeader
        className="mb-4 pl-0 pr-0"
        title={messages.title}
        subTitle={messages.subTitle}
        extra={[
          <RedirectButton url={'/jobs'}>
            {t('pageHeader.buttons.all')}
          </RedirectButton>,
        ]}
      />

      <Content>
        <FilterForm session={session} onFilter={handleFilter} ref={formRef} />
        <div className="position-relative mt-2">
          <DividerVertical text={t('dividers.today')} />
          <WorkflowBoard
            isCardDraggable={isCardDraggable}
            prior="day"
            ref={dayRef}
            onCardClick={showJobDetail}
          />
        </div>

        <div className="position-relative mt-2">
          <DividerVertical text={t('dividers.thisWeek')} />
          <WorkflowBoard
            ref={weekRef}
            prior="week"
            isCardDraggable={isCardDraggable}
            hiddenLaneHeader={true}
            onCardClick={showJobDetail}
          />
        </div>
      </Content>
      {currentJobId && (
        <JobDrawer
          session={session}
          key={currentJobId}
          id={currentJobId}
          ref={jobDrawerRef}
          onSaveCompleted={onSaveJobCompleted}
        />
      )}
    </>
  );
};

export default withAdminLayout(withApollo({ ssr: false })(Workflow));
