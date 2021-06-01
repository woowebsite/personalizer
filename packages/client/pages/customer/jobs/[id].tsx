import React, { useState } from 'react';
import { Layout, Button, PageHeader, Row, Col, Typography } from 'antd';
import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';

// components
import withAdminLayout from 'layout/AdminLayout';
import Card from 'components/Card';
import RedirectButton from '~/components/RedirectButton';

// graphql
import { withApollo } from 'apollo/apollo';
import { useRouter } from 'next/dist/client/router';
import jobService from 'services/jobService';
import { fieldsToMetadata } from '~/shared/metadataHelper';

// inner components
import JobForm from '~/features/jobs/JobForm';
import JobStatus from '~/features/jobs/JobStatus';
import JobMoney from '~/features/jobs/JobMoney';
import { jobQuery } from '~/services/jobService';
import JobAssignee from '~/features/jobs/JobAssignee';
import PageProps from '~/models/PageProps';
import useStateFields from '~/hooks/useStateFields';

const { Content } = Layout;

// CONFIG

const JobDetail = (props: PageProps & any) => {
  // DECLARE
  const { messages, t, query, data: dataJob } = props;
  const [data, setJob] = useStateFields(dataJob);
  const formRef: any = React.createRef();
  const formStatusRef: any = React.createRef();
  const formMoneyRef: any = React.createRef();
  const [upsertJob] = jobService.upsert(); //(userQueries.UPSERT_USER);

  // EVENTS
  const onSave = async () => {
    // check if valid all forms
    let isValid = true;
    await formRef.current.validateFields().catch(() => {
      isValid = false;
    });
    await formStatusRef.current.validateFields().catch(() => {
      isValid = false;
    });
    await formMoneyRef.current.validateFields().catch(() => {
      isValid = false;
    });

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
    const metadata = fieldsToMetadata(metadataFields);

    // taxonomies fields
    const taxonomyFields = {
      ...formValues.taxonomies,
      ...statusValues.taxonomies,
      ...moneyValues.taxonomies,
    };
    const taxonomies = taxonomyFields ? Object.values(taxonomyFields) : [];

    // parse
    const job = data.job
      ? { id: data.job.id, ...formValues.job }
      : formValues.job;

    upsertJob({
      variables: { job, metadata, taxonomies },
    });
  };

  // EVENTS
  const handleFieldChanged = (path, title: string) => {
    setJob(path, title);
  };

  // RENDER
  const title = data.job.title || t('pageHeader.title');
  return (
    <>
      <PageHeader
        className="mb-4 pl-0 pr-0"
        title={title}
        subTitle={messages.subTitle}
        extra={[
          <RedirectButton url={'/customer/jobs'}>
            {t('pageHeader.buttons.all')}
          </RedirectButton>,
          <Button key="2" danger>
            {t('buttons.delete')}
          </Button>,
          <RedirectButton url={'/customer/jobs/new'} type="primary" ghost>
            {t('buttons.create')}
          </RedirectButton>,
          <Button key="1" type="primary" onClick={onSave}>
            {t('buttons.save')}
          </Button>,
        ]}
      />
      <Content>
        <Row gutter={24}>
          <Col span="16">
            <Card className="pt-3">
              <JobForm
                ref={formRef}
                initialValues={data.job}
                onFieldChange={handleFieldChanged}
              />
            </Card>
            <Card className="pt-3">
              <JobAssignee ref={formRef} jobTerms={data.jobTerms} />
            </Card>
          </Col>
          <Col span="8">
            <JobStatus ref={formStatusRef} initialValues={data.job} />
            <JobMoney ref={formMoneyRef} job={data.job} />
          </Col>
        </Row>
      </Content>
    </>
  );
};

export default withAdminLayout(withApollo({ ssr: true })(JobDetail));

JobDetail.getInitialProps = async ({ ctx }) => {
  const { res, req, query, pathname, apolloClient } = ctx;

  const { data, loading, refetch } = await apolloClient.query({
    query: jobQuery.getJob,
    variables: {
      where: { job: { id: parseInt(query.id) }, taxonomyNames: ['job_status'] },
    },
  });

  return {
    query,
    data,
  };
};
