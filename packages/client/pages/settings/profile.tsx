import React from 'react';
import { Layout, Button, PageHeader, Row, Col, Typography } from 'antd';

// components
import withAdminLayout from 'layout/AdminLayout';
import Card from 'components/Card'

// graphql
import { withApollo } from 'apollo/apollo';
import { useRouter } from 'next/dist/client/router';
import userService from 'services/userService';

// inner components
import UserForm from '~/features/UserForm';
import SocialConenct from '~/features/SocialConnect';
import ChangePasswordForm from '~/features/ChangePasswordForm';

const { Content } = Layout;

const ChangePassword = (props) => {
  // DECLARE
  const { messages, t } = props;
  const formRef: any = React.createRef();
  const router = useRouter();



  // EVENTS
  const onSave = () => {
    formRef.current.submit();
  };

  // RENDER
  return (
    <>
      <PageHeader
        className='mb-4 pl-0 pr-0'
        title={t('title')}
        subTitle={messages.subTitle}
        extra={[
          <Button key='3'>Duplicate</Button>,
          <Button key='2' danger >{t('buttons.delete')}</Button>,
          <Button key='1' type='primary' onClick={onSave} >
            {t('buttons.save')}
          </Button>,
        ]}
      />
      <Content>
        <Row gutter={24}>
          <Col span="16">
            <Card className="pt-3">
              <Typography.Title level={5} className="mb-3">{t('changePassword.title')}</Typography.Title>
              <ChangePasswordForm ref={formRef} />
            </Card>
          </Col>
          <Col span="8">
            <Card>
              <Typography.Title level={5} className="mb-3">{t('socialBox.title')}</Typography.Title>
              <SocialConenct />
            </Card>
          </Col>
        </Row>
      </Content>
    </>
  );
};

export default withAdminLayout(withApollo({ ssr: false })(ChangePassword));
