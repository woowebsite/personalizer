import React from 'react';
import Link from 'next/link';
import { useIntl } from 'react-intl';

import Menu from 'components/Menu';

import style from '../style.module.scss';

const {Item} = Menu;

const TopMenu = props => {
  const { formatMessage } = useIntl();
  const f = id => formatMessage({ id });
  return (
    <Menu mode="horizontal" defaultSelectedKeys={['2']} className={style['top-menu']}>
      {props.data
        .filter(x => x.position === 'top')
        .map((menu, i) => {
          return menu.children.map((child, c) => (
            <Item key={`child-menu-${c}`}>
              <Link href={child.url}>{f(child.title)}</Link>
            </Item>
          ));
        })}
    </Menu>
  );
};

export default TopMenu;
