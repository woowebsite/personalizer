import React, { useEffect, useState } from 'react';
import { Select } from 'antd';

const { Option } = Select;
const ComboBox = ({ dataSource, textField, valueField, ...others }) => {
  return (
    <Select {...others}>
      {dataSource.map((option) => (
        <Option key={option[valueField]} value={option[valueField]}>
          {option[textField]}
        </Option>
      ))}
    </Select>
  );
};
export default ComboBox;
