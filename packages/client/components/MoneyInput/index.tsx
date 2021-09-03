import { InputNumber } from 'antd';
import React from 'react';

const MoneyInput = props => {
  return (
    <InputNumber
      {...props}
      step={1000}
      formatter={value => `${value} ₫`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
    />
  );
};
export default MoneyInput;
