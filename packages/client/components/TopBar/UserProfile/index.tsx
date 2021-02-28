import React from 'react';
import { useIntl } from 'react-intl';
import { Menu, Dropdown, Badge, Avatar } from 'antd';

const menu = (t) => (
  <Menu>
    <Menu.Item>
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='http://www.alipay.com/'
      >
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='http://www.taobao.com/'
      >
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target='_blank' rel='noopener noreferrer' href='http://www.tmall.com/'>
        3rd menu item
      </a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
      <a href='javascript: void(0);'>
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
    <Dropdown overlay={menu(t)} placement='topLeft'>
      <Badge count={3}>
        <Avatar
          shape='circle'
          size='default'
          icon='user'
          src='/images/avatars/2.jpg'
        />
      </Badge>
    </Dropdown>
  );
};

export default UserProfile;
