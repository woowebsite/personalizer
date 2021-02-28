import React from 'react';
import { Button } from 'antd';
import { signIn } from 'next-auth/client';
import { useIntl } from 'react-intl';
import {
  FacebookFilled,
  TwitterCircleFilled,
  GooglePlusCircleFilled,
} from '@ant-design/icons';

const SocialConenct = () => {
  const { formatMessage } = useIntl();
  const t = (id, values?) => formatMessage({ id }, values);

  // EVENTS
  const onLinkToFacebook = () => {
    signIn('facebook');
  };
  const onLinkToTwitter = () => {
    signIn('twitter');
  };
  const onLinkToGoogle = () => {
    signIn('google');
  };

  return (
    <>
      <Button.Group className='mb-3'>
        <Button
          onClick={onLinkToFacebook}
          icon={<FacebookFilled />}
          size={'large'}
        />

        <Button onClick={onLinkToFacebook} size={'large'}>
          {t('socialConnect.connectToFacebook')}
        </Button>
      </Button.Group>

      <Button.Group className='mb-3'>
        <Button
          onClick={onLinkToTwitter}
          icon={<TwitterCircleFilled />}
          size={'large'}
        />

        <Button onClick={onLinkToTwitter} size={'large'}>
          {t('socialConnect.connectToTwitter')}
        </Button>
      </Button.Group>

      <Button.Group>
        <Button
          onClick={onLinkToGoogle}
          icon={<GooglePlusCircleFilled />}
          size={'large'}
        />

        <Button onClick={onLinkToGoogle} size={'large'}>
          {t('socialConnect.connectToGoogle')}
        </Button>
      </Button.Group>
    </>
  );
};

export default SocialConenct;
