import { ColumnsType } from 'antd/lib/table';
import { Table } from 'antd';
import { useIntl } from 'react-intl';

// components
import Avatar from 'components/Avatar';

import * as queries from 'definitions/user-definitions';
import withQuery from 'shared/withQuery';
import Link from 'next/link';

export const columns: ColumnsType<any> = [
  {
    title: 'userTable.columns.id',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
  },
  {
    title: 'userTable.columns.image',
    dataIndex: 'image',
    key: 'image',
    width: '5%',
    render: (image: string) => <Avatar alt={image} src={image} />,
  },
  {
    title: 'userTable.columns.name',
    dataIndex: 'name',
    key: 'name',
    width: '25%',
    render: (text) => <span className='text-capitalize'>{text}</span>,
  },
  {
    title: 'userTable.columns.email',
    dataIndex: 'email',
    key: 'email',
    width: '25%',
    render: (text, record) => {
      return <Link href={`/admin/users/${record.id}`}>{text}</Link>;
    },
  },

  {
    title: 'userTable.columns.createdAt',
    dataIndex: 'created_at',
    key: 'createdAt',
    render: (text) => <span className='text-uppercase'>{text}</span>,
  },
];

const UserTable = (props) => {
  const { data, loading, refetch } = withQuery(queries.GET_USERS);

  const { formatMessage } = useIntl();
  const t = (id) => formatMessage({ id });

  columns.map((c) => {
    c.title = t(c.title);
    return c;
  });

  if (loading) return <Table />;

  return (
    <>
      <Table rowKey='id' columns={columns} dataSource={data.users} />
    </>
  );
};

export default UserTable;
