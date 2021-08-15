import React, { useContext } from 'react';
import { useIntl } from 'react-intl';
import { Menu, Dropdown, Badge, Avatar } from 'antd';
import { signIn, signOut, useSession } from 'next-auth/client';
import { UserContext } from '~/layout/AdminLayout';

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
  const session = useContext(UserContext);

  return (
    <Dropdown overlay={menu(t)} placement="topLeft">
      <div>
        <span className="text-white mr-3">{session.user.name}</span>
        <Badge>
          <Avatar
            shape="circle"
            size="default"
            icon="user"
            src={session.user.image}
          />
        </Badge>
      </div>
    </Dropdown>
  );
};

export default UserProfile;
