import React from 'react';
import { Drawer as AntdDrawer } from 'antd';

import style from './style.module.scss';

const Drawer = ({ placement="bottomLeft", children, ...props}) => {
  return (
    <AntdDrawer {...props} className={style['custom-drawer']} >
      {children}
    </AntdDrawer>
  );
};

export default Drawer;
