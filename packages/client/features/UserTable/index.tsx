import { Table, Space, Menu, Dropdown, Button } from 'antd';
import { useIntl } from 'react-intl';

// components
import { columns } from './columns';
import * as queries from 'definitions/user-definitions';
import withQuery from 'shared/withQuery';

const UserTable = (props) => {
  // DEFINES
  const { data, loading, refetch } = withQuery(queries.GET_USERS);
  const { formatMessage } = useIntl();
  const t = (id) => formatMessage({ id });

  // EVENTS
  // RENDER
  if (loading) return <Table />;

  return (
    <>
      <Table rowKey='id' columns={columns(t)} dataSource={data.users} />
    </>
  );
};

export default UserTable;
