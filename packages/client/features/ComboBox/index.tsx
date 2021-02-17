import React from 'react';
import * as userQueries from 'definitions/user-definitions';

import ComboBoxType from './ComboBoxType';
import { Select } from 'antd';

// graphql
import withQuery from 'shared/withQuery';

const { Option } = Select;
const ComboBox = ({ type, textField, valueField, ...others }) => {
  // defines
  let dataSource = [];
  let query = userQueries.GET_USERS;
  switch (type) {
    case ComboBoxType.User:
      query = userQueries.GET_USERS;
      break;
    case ComboBoxType.Product:
      query = userQueries.GET_USERS;
      break;
  }

  // query
  const { data, loading } = withQuery(userQueries.GET_USERS);
  if (loading) return <Select {...others} />;
  switch (type) {
    case ComboBoxType.User:
      dataSource = data.users;
      break;
    case ComboBoxType.Product:
      dataSource = data.products;
      break;
  }

  // render
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
