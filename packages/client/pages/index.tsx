import React from 'react';
import { withApollo } from '../apollo/apollo';
import withUserLayout from 'layout/UserLayout';

const NOSSR = () => {
  return <h1>This should be rendered on client side</h1>;
};

export default withUserLayout(withApollo({ ssr: false })(NOSSR));
