import React from 'react';
import * as userQueries from 'definitions/user-definitions';
import * as roleQueries from 'definitions/role-definitions';

import ComboBoxType from './ComboBoxType';
import { Select } from 'antd';

// graphql
import withQuery from 'shared/withQuery';
import RoleType from '~/models/RoleType';

const { Option } = Select;
const ComboBox = ({ type, textField, valueField, ...others }) => {
  // defines
  let dataSource = [];
  let query, options;
  switch (type) {
    case ComboBoxType.User:
      query = userQueries.GET_USERS;
      break;
    case ComboBoxType.Customer:
      query = userQueries.GET_USERS;
      options = {
        variables: {
          where: { role_id: RoleType.Customer },
        },
      };
      break;
    case ComboBoxType.Leader:
      query = userQueries.GET_USERS;
      options = {
        variables: {
          where: { role_id: RoleType.Leader },
        },
      };
      break;

    case ComboBoxType.Employee:
      query = userQueries.GET_USERS;
      options = {
        variables: {
          where: { role_id: RoleType.Employee },
        },
      };
      break;

    case ComboBoxType.Role:
      query = roleQueries.GET_ROLES;
      break;
  }

  // query
  const { data, loading } = withQuery(query, options);
  if (loading) return <Select {...others} />;
  switch (type) {
    case ComboBoxType.User:
      dataSource = data.users.rows;
      break;
    case ComboBoxType.Customer:
      dataSource = data.users.rows;
      break;
    case ComboBoxType.Leader:
      dataSource = data.users.rows;
      break;
    case ComboBoxType.Employee:
      dataSource = data.users.rows;
      break;
    case ComboBoxType.Role:
      dataSource = data.roles;
      break;
  }

  // render
  return (
    <Select {...others}>
      {dataSource.map(option => (
        <Option key={option[valueField]} value={option[valueField]}>
          {option[textField]}
        </Option>
      ))}
    </Select>
  );
};
export default ComboBox;

export { ComboBoxType };
