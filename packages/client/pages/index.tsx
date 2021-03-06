import React from 'react';
import { withApollo } from '../apollo/apollo';
import BasicLayout from '../layout/BasicLayout';


const NOSSR = () => {
  return (
    <BasicLayout>
      <h1>This should be rendered on client side</h1>
    </BasicLayout>
  );
};

export default withApollo({ ssr: false })(NOSSR);
