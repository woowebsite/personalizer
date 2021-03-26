import React from "react";
import { Table, Space, Menu, Dropdown, Button } from "antd";
import { useIntl } from "react-intl";

// components
import TableQuickEdit from "components/TableQuickEdit";
import TableFilter from "components/TableFilter";
import QuickForm from "./QuickForm";
import FilterForm from "./FilterForm";

import { columns } from "./columns";
import userService from "services/userService";

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

  const renderFilter = (props) => <FilterForm {...props} />;

  const renderTable = (props) => (
    <TableQuickEdit
      {...props}
      ref={userTableRef}
      rowKey="id"
      quickForm={(record) => <QuickForm values={record} onSave={handleSave} />}
      columns={columns(t)}
      dataSource={data && data.users.rows}
    />
  );

  return (
    <>
      <TableFilter
        filter={refetch}
        dataSource={data && data.users.rows}
        filterRender={(props) => renderFilter(props)}
        tableRender={(props) => renderTable(props)}
      />
    </>
  );
};

export default UserTable;
