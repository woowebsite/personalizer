import { Button } from 'antd';
import { signIn } from 'next-auth/client';
import { GooglePlusCircleFilled } from '@ant-design/icons';

const GoogleConnect = props => {
  const { account, buttonConnectText } = props;
  const onLinkToFacebook = () => {
    signIn('google');
  };

  return (
    <>
      {account && (
        <Button.Group className="mb-3">
          <Button icon={<GooglePlusCircleFilled />} size={'large'} />

          <Button onClick={onLinkToFacebook} size={'large'}>
            {account.user_id}
          </Button>
        </Button.Group>
      )}

      {!account && (
        <Button.Group className="mb-3">
          <Button
            onClick={onLinkToFacebook}
            icon={<GooglePlusCircleFilled />}
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

export default GoogleConnect;
