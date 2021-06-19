import React from 'react';
import { useIntl } from 'react-intl';
import { Menu, Dropdown, Badge, Avatar } from 'antd';
import { signIn, signOut, useSession } from 'next-auth/client';

const menu = t => (
  <Menu>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.taobao.com/"
      >
        {t('topBar.profileMenu.profile')}
      </a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
      <a href="javascript: void(0);" onClick={() => signOut()}>
        <i className={`icmn-exit`} />
        {t('topBar.profileMenu.logout')}
      </a>
    </Menu.Item>
  </Menu>
);

const UserProfile = () => {
  const { formatMessage } = useIntl();
  const t = (id, values?) => formatMessage({ id }, values);

  return (
    <Dropdown overlay={menu(t)} placement="topLeft">
      <Badge count={3}>
        <Avatar
          shape="circle"
          size="default"
          icon="user"
          src="/images/avatars/2.jpg"
        />
      </Badge>
    </Dropdown>
  );
};

export default UserProfile;
