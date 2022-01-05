import React from 'react';
import InputNumber from "components/InputNumber";

const PercentInput = props => {
  return <InputNumber {...props} step={1} formatter={value => `${value}%`} />;
};
export default PercentInput;
