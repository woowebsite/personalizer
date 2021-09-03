import React from 'react';
import { Layout, Button, PageHeader, Row, Col, Typography } from 'antd';

// components
import withAdminLayout from 'layout/AdminLayout';
import Card from 'components/Card';

// graphql
import { withApollo } from 'apollo/apollo';

// inner components
import SocialConenct from '~/features/SocialConnect';
import ChangePasswordForm from '~/features/ChangePasswordForm';
import AccountMoney from '~/features/users/AccountMoney';
import ProfileBasicForm from '~/features/users/ProfileBasicForm';
import SalarySetting from '~/features/configuration/SalarySetting';
import KPISetting from '~/features/configuration/KPISetting';
import PriceSetting from '~/features/configuration/PriceSetting';

const { Content } = Layout;

const ConfigurationPage = props => {
  // DECLARE
  const { messages, t, session } = props;
  const { user } = session;
  const formRef: any = React.createRef();
  const formBasicRef: any = React.createRef();

  // EVENTS
  const onSave = async () => {
    let isValid = true;

    await formBasicRef.current.validateFields().catch(() => {
      isValid = false;
    });
    if (!isValid) return;

    // submit
    formBasicRef.current && formBasicRef.current.submit();
  };

  // RENDER
  return (
    <>
      <PageHeader
        className="mb-4 pl-0 pr-0"
        title={t('title')}
        subTitle={messages.subTitle}
      />
      <Content>
        <Row gutter={24}>
          <Col span="16">
            <SalarySetting className="mb-3" />
            <KPISetting className="mb-3" />
            <PriceSetting className="mb-3" />
          </Col>
        </Row>
      </Content>
    </>
  );
};

export default withAdminLayout(withApollo({ ssr: false })(ConfigurationPage));
