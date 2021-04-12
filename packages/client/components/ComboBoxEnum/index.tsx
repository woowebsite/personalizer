import React from 'react';
import { Select } from 'antd';

// graphql

const { Option } = Select;
const ComboBoxEnum = ({ type, ...others }) => {
  // defines
  const dataSource = Object.values<string>(type)
    .filter(e => typeof e === 'string')
    .map(key => ({
      id: type[key],
      name: key,
    }));

  // render
  return (
    <Select {...others}>
      {dataSource.map(option => (
        <Option key={option.id} value={option.name}>
          {option.name}
        </Option>
      ))}
    </Select>
  );
};
export default ComboBoxEnum;
