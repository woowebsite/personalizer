import { Table, Space, Menu, Dropdown, Button } from 'antd';
import { useIntl } from 'react-intl';

// components
import { columns } from './columns';
import userService from 'services/userService';

const UserTable = (props) => {
  // DEFINES
  const { data, loading, refetch } = userService.getAll(); 
  const { formatMessage } = useIntl();
  const t = (id) => formatMessage({ id });

  // EVENTS
  // RENDER
  if (loading) return <Table />;

  return (
    <>
      <Table rowKey='id' columns={columns(t)} dataSource={data.users.rows} />
    </>
  );
};

export default UserTable;
