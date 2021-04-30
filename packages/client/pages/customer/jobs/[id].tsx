import React from 'react';
import { Layout, Button, PageHeader, Row, Col, Typography } from 'antd';

// components
import withAdminLayout from 'layout/AdminLayout';
import Card from 'components/Card';
import RedirectButton from '~/components/RedirectButton';

// graphql
import { withApollo } from 'apollo/apollo';
import { useRouter } from 'next/dist/client/router';
import jobService from 'services/jobService';

// inner components
import JobForm from '~/features/jobs/JobForm';
import JobStatus from '~/features/jobs/JobStatus';
import JobMoney from '~/features/jobs/JobMoney';
import { jobQuery } from '~/services/jobService';
import { fieldsToMetadata } from '~/shared/metadataHelper';

const { Content } = Layout;

const JobDetail = props => {
  // DECLARE
  const { messages, t, query, data } = props;
  const formRef: any = React.createRef();
  const formStatusRef: any = React.createRef();
  const router = useRouter();
  const [upsertJob] = jobService.upsert(); //(userQueries.UPSERT_USER);

  // EVENTS
  const onSave = () => {
    const formValues = formRef.current.getFieldsValue();
    const statusValues = formStatusRef.current.getFieldsValue();

    // metadata fields
    const metadataFields = { ...formValues.metadata, ...statusValues.metadata };

    // taxonomies fields
    const taxonomyFields = {
      ...formValues.taxonomies,
      ...statusValues.taxonomies,
    };

    // parse
    const job = data.job
      ? { id: data.job.id, ...formValues.job }
      : formValues.job;

    const metadata = fieldsToMetadata(metadataFields);
    const taxonomies = taxonomyFields ? Object.values(taxonomyFields) : [];

    upsertJob({
      variables: { job, metadata, taxonomies },
    });
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
          <Button key="1" type="primary" onClick={onSave}>
            {t('buttons.save')}
          </Button>,
        ]}
      />
      <Content>
        <Row gutter={24}>
          <Col span="16">
            <Card className="pt-3">
              <JobForm ref={formRef} initialValues={data.job} />
            </Card>
          </Col>
          <Col span="8">
            <Card className="status-form" title={t('jobStatus.title')}>
              <JobStatus ref={formStatusRef} initialValues={data.job} />
            </Card>
            <Card
              className="mt-4 status-form"
              title={t('jobMoney.title')}
              actions={[
                <Button type="primary" size="small">
                  Thanh toán
                </Button>,
              ]}
            >
              <JobMoney />
            </Card>
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
      where: { id: parseInt(query.id) },
    },
  });

  return {
    query,
    data,
  };
};
