import React, { useState } from 'react';
import {
  Layout,
  Button,
  PageHeader,
  Row,
  Col,
  Typography,
  message,
} from 'antd';
import Router from 'next/router';

// components
import withAdminLayout from 'layout/AdminLayout';
import Card from 'components/Card';
import RedirectButton from '~/components/RedirectButton';

// graphql
import { withApollo } from 'apollo/apollo';
import jobService from 'services/jobService';
import { fieldsToMetadata } from '~/shared/metadataHelper';

// inner components
import JobForm from '~/features/jobs/JobForm';
import JobStatusBox from '~/features/jobs/JobStatus';
import JobMoney from '~/features/jobs/JobMoney';

// utils
import JobStatus from '~/features/jobs/constants/jobStatus';
import PageTitle from '~/features/jobs/PageTitle';
import newJobAuthConfig from '~/features/jobs/authorized/newJob';
import AuthorizedWrapper from '~/components/AuthorizedWrapper';

const { Content } = Layout;
const JobNew = props => {
  // DECLARE
  const { messages, t } = props;
  const formRef: any = React.createRef();
  const pageTitleRef: any = React.createRef();

  // EVENTS
  const onSave = () => {
    formRef.current.submit();
  };
  // EVENTS
  const handleFieldChanged = (path, title: string) => {
    pageTitleRef.current.setTitle(title);
  };

  const onSaveCompleted = ({ upsertJob }) => {
    // redirect
    Router.push('/jobs/' + upsertJob.id);
  };

  // RENDER
  return (
    <>
      <PageTitle
        session={props.session}
        ref={pageTitleRef}
        messages={messages}
        t={t}
        onSave={onSave}
      />
      <Content>
        <Row gutter={24}>
          <Col span="16">
            <Card className="pt-3">
              <JobForm
                ref={formRef}
                onSaveCompleted={onSaveCompleted}
                onFieldChange={handleFieldChanged}
              />
            </Card>
          </Col>
        </Row>
      </Content>
    </>
  );
};

export default withAdminLayout(withApollo({ ssr: false })(JobNew));
