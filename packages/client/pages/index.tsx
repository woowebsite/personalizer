import React from 'react';
import { withApollo } from '../apollo/apollo';
import withAdminLayout from 'layout/AdminLayout';

const NOSSR = () => {
  return <h1>This should be rendered on client side</h1>;
};

export default withAdminLayout(withApollo({ ssr: false })(NOSSR));
