import Link from 'next/link';
import { ColumnsType } from 'antd/lib/table';
import { Table, Space, Menu, Dropdown, Button } from 'antd';
import { DownOutlined, UserOutlined, MoreOutlined } from '@ant-design/icons';
import Avatar from 'components/Avatar';
import ComboBoxEnum from '~/components/ComboBoxEnum';
import CustomerType from '~/models/CustomerType';

const menu = (
  <Menu>
    <Menu.Item key="1" icon={<UserOutlined />}>
      Reset Password
    </Menu.Item>
    <Menu.Item key="2" icon={<UserOutlined />}>
      2nd menu item
    </Menu.Item>
    <Menu.Item key="3" icon={<UserOutlined />}>
      3rd menu item
    </Menu.Item>
  </Menu>
);

export const columns = (t, onDeleteJob): ColumnsType<any> => {
  return [
    {
      title: t('jobTable.columns.id'),
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },

    {
      title: t('jobTable.columns.title'),
      dataIndex: 'title',
      key: 'title',
      width: '25%',
      render: (text, record) => {
        console.log('record', record);

        return text ? <Link href={`/jobs/${record.id}`}>{text}</Link> : text;
      },
    },
    {
      title: t('jobTable.columns.link'),
      dataIndex: 'link',
      key: 'link',
      width: '25%',
      render: link => {
        return link ? <Link href={link}>{link}</Link> : link;
      },
    },
    {
      title: t('jobTable.columns.status'),
      dataIndex: 'status',
      key: 'status',
      width: '25%',
    },
    {
      title: '',
      className: 'actions-cell',
      width: '15%',
      key: 'action',
      sorter: false,
      render: (value, record, index) => (
        <Button.Group>
          <Button onClick={() => onDeleteJob(record.id)} type="link">
            {t('buttons.delete')}
          </Button>

          <Dropdown placement="bottomRight" overlay={menu}>
            <Button>
              {t('buttons.actions')}
              <DownOutlined />
            </Button>
          </Dropdown>
        </Button.Group>
      ),
    },
  ];
};
