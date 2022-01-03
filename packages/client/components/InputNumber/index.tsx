import React from 'react';
import { InputNumber as AntdInputNumber } from 'antd';

import style from './style.module.scss';

const InputNumber = (props) => {
  const { children } = props;

  return (
    <AntdInputNumber {...props} className={style['custom-inputnumber']} >
      {children}
    </AntdInputNumber>
  );
};

export default InputNumber;
