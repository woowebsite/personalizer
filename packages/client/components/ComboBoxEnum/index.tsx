import React from 'react';
import { Select, SelectProps } from 'antd';

// graphql

interface ComboBoxEnumProps {
  defaultValue?: string;
  type: any;
}

const { Option } = Select;
const ComboBoxEnum: React.FC<ComboBoxEnumProps & SelectProps<any>> = ({
  type,
  defaultValue,
  ...others
}) => {
  const selectedValue = defaultValue ? parseInt(defaultValue) : null;
  // defines
  const dataSource = Object.keys(type).map(key => ({
    id: type[key],
    name: key,
  }));

  // render
  return (
    <Select defaultValue={selectedValue} {...others}>
      {dataSource.map(option => (
        <Option key={option.id} value={option.id}>
          {option.name}
        </Option>
      ))}
    </Select>
  );
};
export default ComboBoxEnum;
