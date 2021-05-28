import React from 'react';
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
import JobStatus from '~/features/jobs/JobStatus';
import JobMoney from '~/features/jobs/JobMoney';

const { Content } = Layout;

const JobNew = props => {
  // DECLARE
  const { messages, t } = props;
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
    console.log('isValid', isValid);

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

  // RENDER
  return (
    <>
      <PageHeader
        className="mb-4 pl-0 pr-0"
        title={messages.title}
        extra={[
          <RedirectButton url={'/customer/jobs'}>
            {messages['pageHeader.buttons.all']}
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
              <JobForm ref={formRef} />
            </Card>
          </Col>
          <Col span="8">
            <Card className="status-form" title={t('jobStatus.title')}>
              <JobStatus ref={formStatusRef} />
            </Card>
            <JobMoney ref={formMoneyRef} />
          </Col>
        </Row>
      </Content>
    </>
  );
};

export default withAdminLayout(withApollo({ ssr: false })(JobNew));
