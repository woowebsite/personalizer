import React, { useRef } from 'react';
import { Layout, PageHeader, Button } from 'antd';

// components
import withAdminLayout from 'layout/AdminLayout';
import RedirectButton from '~/components/RedirectButton';

// graphql
import { withApollo } from 'apollo/apollo';
import UserForm from '~/features/UserForm';
import ContactCard from '~/features/users/ContactCard';

const { Content } = Layout;

const ManagementUsers = props => {
  const { messages, t } = props;
  const formRef: any = React.createRef();

  const onSave = () => {
    formRef.current.submit();
  };
  return (
    <>
      <PageHeader
        className="mb-4 pl-0 pr-0"
        title={messages.title}
        onBack={() => window.history.back()}
        extra={[
          <RedirectButton url={'/admin/users'}>
            {t('buttons.discard')}
          </RedirectButton>,
          <Button onClick={onSave} type="primary">
            {t('buttons.save')}
          </Button>,
        ]}
        subTitle={messages.subTitle}
      />
      <Content>
        <UserForm ref={formRef} />
        <ContactCard />
      </Content>
    </>
  );
};

export default withAdminLayout(withApollo({ ssr: false })(ManagementUsers));
