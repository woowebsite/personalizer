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

  // EVENTS
  const onSave = () => {
    formRef.current.onSubmit();
    formStatusRef.current.onSubmit();
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
              <JobForm ref={formRef} />
            </Card>
          </Col>
          <Col span="8">
            <Card className="status-form" title={t('jobStatus.title')}>
              <JobStatus ref={formStatusRef} />
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

export default withAdminLayout(withApollo({ ssr: false })(JobNew));
