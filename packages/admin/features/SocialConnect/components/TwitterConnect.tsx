import { Button } from 'antd';
import { signIn } from 'next-auth/client';
import { TwitterCircleFilled } from '@ant-design/icons';

const TwitterConnect = props => {
  const { account, buttonConnectText } = props;
  const onLinkToFacebook = () => {
    signIn('twitter');
  };

  return (
    <>
      {account && (
        <Button.Group className="mb-3">
          <Button icon={<TwitterCircleFilled />} size={'large'} />

          <Button onClick={onLinkToFacebook} size={'large'}>
            {account.user_id}
          </Button>
        </Button.Group>
      )}

      {!account && (
        <Button.Group className="mb-3">
          <Button
            onClick={onLinkToFacebook}
            icon={<TwitterCircleFilled />}
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

export default TwitterConnect;
