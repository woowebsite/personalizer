import React from 'react';
import { withApollo } from '../apollo/apollo';
import withAdminLayout from 'layout/AdminLayout';
import Icon from '~/components/Icon';

const IndexPage = () => {
  return (
    <h1>
      This should be rendered on client side
      <Icon icon="Refresh" />
    </h1>
  );
};

export default withAdminLayout(withApollo({ ssr: false })(IndexPage));
