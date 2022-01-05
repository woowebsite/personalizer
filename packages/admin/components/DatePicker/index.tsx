import React from 'react';
import { DatePicker as AntdDatePicker } from 'antd';

import style from './style.module.scss';

const DatePicker = ({ ...props }) => (
  <AntdDatePicker
    {...props}
    className={style['custom-datepicker']}
  />
);

export default DatePicker;
