import React from 'react';
import { Select as AntdSelect } from 'antd';

import style from './style.module.scss';

const { Option } = AntdSelect;

const Select = (props) => {
  const { children } = props;

  return (
    <AntdSelect {...props} className={style['custom-select']} >
      {children}
    </AntdSelect>
  );
};

Select.Option = Option;

export default Select;
