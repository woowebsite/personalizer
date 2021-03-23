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
  const [upsertUser, result] = userService.upsert(); //(userQueries.UPSERT_USER);

  const { formatMessage } = useIntl();
  const t = (id) => formatMessage({ id });

  // EVENTS
  // RENDER
  if (loading) return <Table />;

  return (
    <>
      <TableQuickEdit
        rowKey="id"
        saving={result.loading}
        quickForm={(record) => <QuickForm values={record} save={upsertUser} />}
        columns={columns(t)}
        dataSource={data.users.rows}
      />
    </>
  );
};

export default UserTable;
