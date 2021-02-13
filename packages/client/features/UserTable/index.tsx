import { ColumnsType } from 'antd/lib/table';
import { Table } from 'antd';
import { useIntl } from 'react-intl';

import * as queries from 'definitions/user-definitions';
import withQuery from 'shared/withQuery';

export const columns: ColumnsType<any> = [
  {
    title: 'userTable.columns.id',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
  },
  {
    title: 'userTable.columns.name',
    dataIndex: 'name',
    key: 'name',
    width: '25%',
    render: (text) => <span className='text-capitalize'>{text}</span>,
  },
  {
    title: 'userTable.columns.age',
    dataIndex: 'age',
    key: 'age',
    width: '25%',
    render: (text) => <span className='text-capitalize'>{text}</span>,
  },
  {
    title: 'userTable.columns.createdAt',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (text) => <span className='text-uppercase'>{text}</span>,
  },
];

const UserTable = (props) => {
  const { data, refetch } = withQuery(queries.GET_USERS);

  const { formatMessage } = useIntl();
  const t = (id) => formatMessage({ id });

  columns.map((c) => {
    c.title = t(c.title);
    return c;
  });
  return (
    <>{data && data.users && <Table columns={columns} dataSource={data.users} />}</>
  );
};

export default UserTable;
