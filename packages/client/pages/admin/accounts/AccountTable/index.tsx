import { ColumnsType } from 'antd/lib/table';
import { Table } from 'antd';

export const columns: ColumnsType<any> = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: '25%',
    render: (text) => <span className='text-capitalize'>{text}</span>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: '25%',
    render: (text) => <span className='text-capitalize'>{text}</span>,
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (text) => <span className='text-uppercase'>{text}</span>,
  },
];

const AccountTable = (props) => {
  return <Table columns={columns} dataSource={props.dataSource} />;
};

export default AccountTable;
