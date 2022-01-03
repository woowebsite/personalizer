import React from 'react';
import { Dropdown as AntdDropdown } from 'antd';

import style from './style.module.scss';

const Dropdown = ({ placement="bottomLeft", children, ...props}) => {
  return (
    <AntdDropdown placement={placement} {...props} overlayClassName={style['custom-overlay-dropdown']} >
      {children}
    </AntdDropdown>
  );
};

export default Dropdown;
