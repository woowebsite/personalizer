import React from 'react';
import { withApollo } from '../apollo/apollo';
import withAdminLayout from 'layout/AdminLayout';

const IndexPage = () => {
  return <h1>This should be rendered on client side</h1>;
};

export default withAdminLayout(withApollo({ ssr: false })(IndexPage));

IndexPage.getInitialProps = async ({ ctx }) => {
  const { res, req, query, pathname, apolloClient } = ctx;
  res.redirects('/workflow');
};
