import { ColumnsType } from 'antd/lib/table';
import { Table } from 'antd';
import { useIntl } from 'react-intl';

export const columns: ColumnsType<any> = [
  {
    title: 'tableAccount.columns.id',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
  },
  {
    title: 'tableAccount.columns.name',
    dataIndex: 'name',
    key: 'name',
    width: '25%',
    render: (text) => <span className='text-capitalize'>{text}</span>,
  },
  {
    title: 'tableAccount.columns.age',
    dataIndex: 'age',
    key: 'age',
    width: '25%',
    render: (text) => <span className='text-capitalize'>{text}</span>,
  },
  {
    title: 'tableAccount.columns.createdAt',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (text) => <span className='text-uppercase'>{text}</span>,
  },
];

const AccountTable = (props) => {
  const { formatMessage } = useIntl();
  const t = (id) => formatMessage({ id });

  columns.map((c) => {
    c.title = t(c.title);
    return c;
  });
  return <Table columns={columns} dataSource={props.dataSource} />;
};

export default AccountTable;
