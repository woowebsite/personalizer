import React, { useContext } from 'react';
import { useIntl } from 'react-intl';
import { Menu, Dropdown, Badge } from 'antd';
import { signIn, signOut, useSession } from 'next-auth/client';
import { UserContext } from '~/layout/AdminLayout';
import Link from 'next/link';
import Avatar from '~/components/Avatar';

const menu = t => (
  <Menu>
    <Menu.Item>
      <Link href={'/settings/profile'}>{t('topBar.profileMenu.profile')}</Link>
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
          <Avatar src={session.user.image} />
        </Badge>
      </div>
    </Dropdown>
  );
};

export default UserProfile;
