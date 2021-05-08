import React from 'react';
import { Divider } from 'antd';
import { Layout, Button, PageHeader, Row, Col, Typography } from 'antd';

// components
import withAdminLayout from 'layout/AdminLayout';
import RedirectButton from '~/components/RedirectButton';

// graphql
import { withApollo } from 'apollo/apollo';

// inner components
import FilterForm from 'features/workflows/FilterForm';
import WorkflowBoard from 'features/workflows/Workflow';

const { Content } = Layout;

const Workflow = props => {
  // DECLARE
  const { messages, t, query } = props;
  const weekRef: any = React.createRef();
  const dayRef: any = React.createRef();

  // EVENTS
  const handleFilter = values => {
    weekRef.current.filter(values);
    dayRef.current.filter(values);
  };

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
        <FilterForm onFilter={handleFilter} />
        <Divider orientation="left" plain>
          {t('dividers.today')}
        </Divider>
        <WorkflowBoard prior="day" ref={dayRef} />
        <Divider orientation="left" plain>
          {t('dividers.thisWeek')}
        </Divider>
        <WorkflowBoard className="hidden-lane-header" prior="week" hiddenLaneHeader={true} ref={weekRef} />
      </Content>
    </>
  );
};

export default withAdminLayout(withApollo({ ssr: false })(Workflow));
