import React, { useContext } from 'react';
import { useIntl } from 'react-intl';
import { signOut } from 'next-auth/client';
import { UserContext } from '~/layout/AdminLayout';
import Link from 'next/link';

import Menu from 'components/Menu';
import Avatar from 'components/Avatar';
import Dropdown from 'components/Dropdown';

const { Item, Divider } = Menu;

const menu = t => (
  <Menu>
    <Item>
      <Link href={'/settings/profile'}>{t('topBar.profileMenu.profile')}</Link>
    </Item>
    <Divider />
    <Item>
      <a href="javascript: void(0);" onClick={() => signOut()}>
        <i className={`icmn-exit`} />
        {t('topBar.profileMenu.logout')}
      </a>
    </Item>
  </Menu>
);

const UserProfile = () => {
  const { formatMessage } = useIntl();
  const t = (id, values?) => formatMessage({ id }, values);
  const session = useContext(UserContext);

  return (
    <Dropdown overlay={menu(t)} placement="topLeft">
      <div className="user-info">
          <Avatar src={session.user.image} />
          <strong>{session.user.name}</strong>
      </div>
    </Dropdown>
  );
};

export default UserProfile;
