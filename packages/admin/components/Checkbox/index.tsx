import React from 'react';
import { Checkbox as AntdCheckbox } from 'antd';

import style from './style.module.scss';

const Checkbox = (props) => {
  const { children } = props;

  return (
    <AntdCheckbox {...props} className={style['custom-checkbox']} >
      {children}
    </AntdCheckbox>
  );
};

export default Checkbox;
