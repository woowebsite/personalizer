import React, { FC } from 'react';
import Link from 'next/link';
import { useIntl } from 'react-intl';

import Menu from 'components/Menu';

import style from '../style.module.scss';

const { Item } = Menu;

interface TopMenuProps {
  menus: any[];
}
const TopMenu: FC<TopMenuProps> = ({ menus }) => {
  const { formatMessage } = useIntl();
  const f = id => formatMessage({ id });
  return (
    <Menu
      mode="horizontal"
      defaultSelectedKeys={['2']}
      className={style['top-menu']}
    >
      {menus.map((child, c) => (
        <Item key={`child-menu-${c}`}>
          <Link href={child.url}>{f(child.title)}</Link>
        </Item>
      ))}
    </Menu>
  );
};

export default TopMenu;
