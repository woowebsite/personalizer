import React from 'react';
import { Layout, Row, Col } from 'antd';

// components
import withAdminLayout from 'layout/AdminLayout';
import Card from 'components/Card';

// graphql
import { withApollo } from 'apollo/apollo';
import jobService from 'services/jobService';
import { fieldsToMetadata } from '~/shared/metadataHelper';

// inner components
import PageTitle from '~/features/jobs/PageTitle';
import JobForm from '~/features/jobs/JobForm';
import JobStatus from '~/features/jobs/JobStatus';
import JobMoney from '~/features/jobs/JobMoney';
import { jobQuery } from '~/services/jobService';
import JobAssignee from '~/features/jobs/JobAssignee';
import PageProps from '~/models/PageProps';
import useStateFields from '~/hooks/useStateFields';
import AuthorizedWrapper from '~/components/AuthorizedWrapper';

// utils
import updateJobAuthConfig from '~/features/jobs/authorized/updateJob';

const { Content } = Layout;

// CONFIG

const JobDetail = (props: PageProps & any) => {
  // DECLARE
  const { messages, t, query, data: dataJob } = props;
  const [data, setJob] = useStateFields(dataJob);
  const pageTitleRef: any = React.createRef();
  const formRef: any = React.createRef();
  const formStatusRef: any = React.createRef();
  const formMoneyRef: any = React.createRef();
  const [upsertJob] = jobService.upsert(); //(userQueries.UPSERT_USER);

  // EVENTS
  const onSave2 = async () => {
    // check if valid all forms
    let isValid = true;
    await formRef.current.validateFields().catch(() => {
      isValid = false;
    });
    formStatusRef.current &&
      (await formStatusRef.current.validateFields().catch(() => {
        isValid = false;
      }));
    formMoneyRef.current &&
      (await formMoneyRef.current.validateFields().catch(() => {
        isValid = false;
      }));
    if (!isValid) return;

    // submit
    formRef.current.submit();
    formStatusRef.current && formStatusRef.current.submit();
    formMoneyRef.current && formMoneyRef.current.submit();
  };
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
    pageTitleRef.current.setTitle(title);
  };

  // RENDER
  const title = data.job.title || t('pageHeader.title');
  return (
    <>
      <PageTitle
        data={data}
        ref={pageTitleRef}
        messages={messages}
        t={t}
        onSave={onSave2}
      />
      <Content>
        <Row gutter={24}>
          <Col span="16">
            <Card className="pt-3 mb-4">
              <JobForm
                ref={formRef}
                initialValues={data.job}
                onFieldChange={handleFieldChanged}
              />
            </Card>
            <AuthorizedWrapper
              config={updateJobAuthConfig.JobAssignee}
              session={props.session}
            >
              <Card className="pt-3">
                <JobAssignee ref={formRef} jobTerms={data.jobTerms} />
              </Card>
            </AuthorizedWrapper>
          </Col>
          <Col span="8">
            <AuthorizedWrapper
              config={updateJobAuthConfig.JobStatusBox}
              session={props.session}
            >
              <JobStatus ref={formStatusRef} initialValues={data.job} />
              <JobMoney ref={formMoneyRef} initialValues={data.job} />
            </AuthorizedWrapper>
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
