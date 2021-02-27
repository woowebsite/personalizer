import React from 'react';
import { Layout, Button, PageHeader, Row, Col } from 'antd';
import { signIn } from 'next-auth/client';

// components
import withAdminLayout from 'layout/AdminLayout';

// graphql
import withQuery from 'shared/withQuery';
import { withApollo } from 'apollo/apollo';
import * as queries from 'definitions/user-definitions';
import { useRouter } from 'next/dist/client/router';
import UserForm from '~/features/UserForm';

const { Content } = Layout;

const UserDetail = (props) => {
  // DECLARE
  const { messages, t } = props;
  const formRef: any = React.createRef();
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, refetch } = withQuery(queries.GET_USER, {
    variables: {
      id: parseInt(id.toString()),
    },
  });

  if (loading) {
    return null;
  }

  // EVENTS
  const onSave = () => {
    formRef.current?.onSubmit();
  };

  const onLinkToFacebook = () => {
    signIn('facebook');
  }

  
  // RENDER
  const title = data.user.name || 'Unknow name';
  return (
    <>
      <PageHeader
        className='mb-4 pl-0 pr-0'
        title={title}
        subTitle={messages.subTitle}
        extra={[
          <Button key='3'>Duplicate</Button>,
          <Button key='2'>Operation</Button>,
          <Button onClick={onSave} type='primary'>
            {t('buttons.save')}
          </Button>,
        ]}
      />
      <Content>
        <Row gutter={24}>
          <Col span="16">
            <UserForm ref={formRef} id={parseInt(id.toString())} />
          </Col>
          <Col span="8">
              <Button onClick={onLinkToFacebook}>Link to facebook</Button>
          </Col>
        </Row>
      </Content>
    </>
  );
};

export default withAdminLayout(withApollo({ ssr: false })(UserDetail));
