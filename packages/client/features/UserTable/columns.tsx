import Link from 'next/link';
import { ColumnsType } from 'antd/lib/table';
import { Table, Space, Menu, Dropdown, Button } from 'antd';
import { useIntl } from 'react-intl';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import Avatar from 'components/Avatar';

const menu = (
  <Menu>
    <Menu.Item key='1' icon={<UserOutlined />}>
      1st menu item
    </Menu.Item>
    <Menu.Item key='2' icon={<UserOutlined />}>
      2nd menu item
    </Menu.Item>
    <Menu.Item key='3' icon={<UserOutlined />}>
      3rd menu item
    </Menu.Item>
  </Menu>
);

export const columns = (t): ColumnsType<any> => {
  return [
    {
      title: t('userTable.columns.id'),
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: t('userTable.columns.image'),
      dataIndex: 'image',
      key: 'image',
      width: '5%',
      render: (image: string) => <Avatar alt={image} src={image} />,
    },
    {
      title: t('userTable.columns.name'),
      dataIndex: 'name',
      key: 'name',
      width: '25%',
      render: (text) => <span className='text-capitalize'>{text}</span>,
    },
    {
      title: t('userTable.columns.email'),
      dataIndex: 'email',
      key: 'email',
      width: '25%',
      render: (text, record) => {
        return <Link href={`/admin/users/${record.id}`}>{text}</Link>;
      },
    },

    {
      title: t('userTable.columns.createdAt'),
      dataIndex: 'created_at',
      key: 'createdAt',
      render: (text) => <span className='text-uppercase'>{text}</span>,
    },
    {
      title: t('Action'),
      key: 'action',
      sorter: true,
      render: () => (
        <Space size='middle'>
          <a>Delete</a>
          <Dropdown overlay={menu}>
            <a
              className='ant-dropdown-link'
              onClick={(e) => e.preventDefault()}
            >
              Actions <DownOutlined />
            </a>
          </Dropdown>
        </Space>
      ),
    },
  ];
};
