import React from 'react';
import { Menu as AntdMenu } from 'antd';

const { Item, SubMenu, Divider } = AntdMenu;

const Menu = (props) => {
  const { children } = props;

  return (
    <AntdMenu {...props} >
      {children}
    </AntdMenu>
  );
};

Menu.Item = Item;
Menu.SubMenu = SubMenu;
Menu.Divider = Divider;

export default Menu;
