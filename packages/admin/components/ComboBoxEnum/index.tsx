import React from 'react';
import Select from "components/Select";

const { Option } = Select;

const ComboBoxEnum = ({ type, defaultValue = null, ...others }) => {
  const selectedValue = defaultValue ? parseInt(defaultValue) : null;
  // defines
  const dataSource = Object.values<string>(type)
    .filter(e => typeof e === 'string')
    .map(key => ({
      id: type[key],
      name: key,
    }));

  // render
  return (
    <Select defaultValue={selectedValue} {...others}>
      {dataSource?.map(option => (
        <Option key={option.id} value={option.id}>
          {option.name}
        </Option>
      ))}
    </Select>
  );
};
export default ComboBoxEnum;
