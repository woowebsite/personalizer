import React from 'react';
import InputNumber from "components/InputNumber";

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
