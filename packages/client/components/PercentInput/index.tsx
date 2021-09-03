import { InputNumber } from 'antd';
import React from 'react';

const PercentInput = props => {
  return <InputNumber {...props} step={1} formatter={value => `${value}%`} />;
};
export default PercentInput;
