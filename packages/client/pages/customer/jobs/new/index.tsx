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
import JobStatus from '~/constants/jobStatus';
import PageTitle from '~/features/jobs/PageTitle';
import newJobAuthConfig from '~/features/jobs/authorized/newJob';
import AuthorizedWrapper from '~/components/AuthorizedWrapper';

const { Content } = Layout;
const JobNew = props => {
  // DECLARE
  const { messages, t } = props;
  const formRef: any = React.createRef();
  const formStatusRef: any = React.createRef();
  const formMoneyRef: any = React.createRef();
  const pageTitleRef: any = React.createRef();
  const [upsertJob] = jobService.upsert(); //(userQueries.UPSERT_USER);
  const initialValues = {
    cost: 0,
    paid: 0,
    status: JobStatus.Draft,
    job_status: JobStatus.Publish,
  };

  // EVENTS
  const onPublish = () => {};
  const onSave2 = () => {
    formRef.current.submit();
  };
  const onSave = async () => {
    // check if valid all forms
    let isValid = true;
    await formRef.current.validateFields().catch(() => {
      isValid = false;
    });
    if (formStatusRef.current) {
      await formStatusRef.current.validateFields().catch(() => {
        isValid = false;
      });
    }
    if (formMoneyRef.current) {
      await formMoneyRef.current.validateFields().catch(() => {
        isValid = false;
      });
    }

    if (!isValid) return;

    // prepare data
    const formValues = formRef.current.getFieldsValue();
    const statusValues = formStatusRef.current.getFieldsValue();
    const moneyValues = formMoneyRef.current.getFieldsValue();

    // metadata fields
    const metadataFields = {
      ...formValues.metadata,
      ...statusValues.metadata,
      ...moneyValues.metadata,
    };

    // taxonomies fields
    const taxonomyFields = {
      ...formValues.taxonomies,
      ...statusValues.taxonomies,
      ...moneyValues.taxonomies,
    };

    // parse
    const job = formValues.job;
    const metadata = fieldsToMetadata(metadataFields);
    const taxonomies = taxonomyFields ? Object.values(taxonomyFields) : [];

    upsertJob({
      variables: { job, metadata, taxonomies },
    });
  };

  // EVENTS
  const handleFieldChanged = (path, title: string) => {
    pageTitleRef.current.setTitle(title);
  };

  // RENDER
  return (
    <>
      <PageTitle
        ref={pageTitleRef}
        messages={messages}
        t={t}
        onSave={onSave2}
      />
      <Content>
        <Row gutter={24}>
          <Col span="16">
            <Card className="pt-3">
              <JobForm ref={formRef} onFieldChange={handleFieldChanged} />
            </Card>
          </Col>
        </Row>
      </Content>
    </>
  );
};

export default withAdminLayout(withApollo({ ssr: false })(JobNew));
