import React from 'react';
import { Layout, Button, PageHeader, Row, Col, Typography } from 'antd';

// components
import withUserLayout from 'layout/UserLayout';
import Card from 'components/Card';

// graphql
import { withApollo } from 'apollo/apollo';

// inner components
import SocialConenct from '~/features/SocialConnect';
import ChangePasswordForm from '~/features/ChangePasswordForm';
import AccountMoney from '~/features/users/AccountMoney';

const { Content } = Layout;

const Profile = props => {
  // DECLARE
  const { messages, t, session } = props;
  const { user } = session;
  const formRef: any = React.createRef();
  const formAccountMoneyRef: any = React.createRef();

  // EVENTS
  const onSave = async () => {
    // check if valid all forms
    let isValid = true;
    await formAccountMoneyRef.current.validateFields().catch(() => {
      isValid = false;
    });
    if (!isValid) return;

    // get account money
    const accountMoneyValues = formAccountMoneyRef.current.getFieldsValue();
  };

  // RENDER
  return (
    <>
      <PageHeader
        className="mb-4 pl-0 pr-0"
        title={t('title')}
        subTitle={messages.subTitle}
        extra={[
          <Button key="1" type="primary" onClick={onSave}>
            {t('buttons.save')}
          </Button>,
        ]}
      />
      <Content>
        <Row gutter={24}>
          <Col span="16">
            <Card className="pt-3">
              <Typography.Title level={5} className="mb-3">
                {t('changePassword.title')}
              </Typography.Title>
              <ChangePasswordForm ref={formRef} user={user} />
            </Card>
          </Col>
          <Col span="8">
            <AccountMoney
              ref={formAccountMoneyRef}
              user={user}
              className="mb-3"
            />
            <Card>
              <Typography.Title level={5} className="mb-3">
                {t('socialBox.title')}
              </Typography.Title>
              <SocialConenct userId={user.id} />
            </Card>
          </Col>
        </Row>
      </Content>
    </>
  );
};

export default withUserLayout(withApollo({ ssr: false })(Profile));
