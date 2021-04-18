import { Button } from 'antd';
import { signIn } from 'next-auth/client';
import { FacebookFilled } from '@ant-design/icons';

const FacebookConnect = props => {
  const { account, buttonConnectText } = props;
  const onLinkToFacebook = () => {
    signIn('facebook', { callbackUrl: '/settings/profile' });
  };

  return (
    <>
      {account && (
        <Button.Group className="mb-3">
          <Button icon={<FacebookFilled />} size={'large'} />

          <Button size={'large'}>Unlink</Button>
        </Button.Group>
      )}

      {!account && (
        <Button.Group className="mb-3">
          <Button
            onClick={onLinkToFacebook}
            icon={<FacebookFilled />}
            size={'large'}
          />

          <Button onClick={onLinkToFacebook} size={'large'}>
            {props.buttonConnectText}
          </Button>
        </Button.Group>
      )}
    </>
  );
};

export default FacebookConnect;
