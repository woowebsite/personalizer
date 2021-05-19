import React from 'react';
import { Menu } from 'antd';
import Link from 'next/link';
import { useIntl } from 'react-intl';

const TopMenu = props => {
  const { formatMessage } = useIntl();
  const f = id => formatMessage({ id });
  return (
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
      {props.data
        .filter(x => x.position === 'top')
        .map((menu, i) => {
          return menu.children.map((child, c) => (
            <Menu.Item key={`child-menu-${c}`}>
              <Link href={child.url}>{f(child.title)}</Link>
            </Menu.Item>
          ));
        })}
    </Menu>
  );
};

export default TopMenu;
