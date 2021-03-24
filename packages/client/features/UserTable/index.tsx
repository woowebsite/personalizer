import React from "react";
import { Table, Space, Menu, Dropdown, Button } from "antd";
import { useIntl } from "react-intl";

import TableQuickEdit from "components/TableQuickEdit";

// components
import { columns } from "./columns";
import userService from "services/userService";
import QuickForm from "./QuickForm";

const UserTable = (props) => {
  // DEFINES
  const { data, loading, refetch } = userService.getAll();
  const userTableRef = React.useRef(null);
  const [upsertUser, result] = userService.upsert(); //(userQueries.UPSERT_USER);

  const { formatMessage } = useIntl();
  const t = (id) => formatMessage({ id });

  // EVENTS
  const handleSave = (values) => {
    upsertUser({
      variables: { user: values },
    });
  };
  // RENDER
  if (loading) return <Table />;
  if (result.loading) userTableRef.current.collapseAll();

  return (
    <>
      <TableQuickEdit
        ref={userTableRef}
        rowKey="id"
        quickForm={(record) => (
          <QuickForm values={record} onSave={handleSave} />
        )}
        columns={columns(t)}
        dataSource={data.users.rows}
      />
    </>
  );
};

export default UserTable;
