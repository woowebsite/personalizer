import React from 'react';
import { Button } from 'antd';
import { signIn } from 'next-auth/client';
import { useIntl } from 'react-intl';

const SocialConenct = () => {
  const { formatMessage } = useIntl();
  const t = (id, values?) => formatMessage({ id }, values);

  // EVENTS
  const onLinkToFacebook = () => {
    signIn('facebook');
  };

  return (
    <Button onClick={onLinkToFacebook}>
      {t('socialConnect.connectToFacebook')}
    </Button>
  );
};

export default SocialConenct;
