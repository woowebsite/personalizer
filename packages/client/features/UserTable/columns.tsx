import Link from 'next/link';
import { ColumnsType } from 'antd/lib/table';
import { Table, Space, Menu, Dropdown, Button } from 'antd';
import { useIntl } from 'react-intl';
import { DownOutlined, UserOutlined, MoreOutlined } from '@ant-design/icons';
import Avatar from 'components/Avatar';
import ComboBox, { ComboBoxType } from '~/components/ComboBox';
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

export const columns = (t, onDeleteUser, onRoleChanged): ColumnsType<any> => {
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
      render: (text, record) => {
        return <Link href={`/admin/users/${record.id}`}>{text}</Link>;
      },
    },
    {
      title: t('userTable.columns.phone'),
      dataIndex: 'phone',
      key: 'phone',
      width: '25%',
    },
    {
      title: t('userTable.columns.email'),
      dataIndex: 'email',
      key: 'email',
      width: '25%',
      render: text => <span className="text-capitalize">{text}</span>,
    },

    {
      title: t('userTable.columns.role'),
      key: 'role_id',
      dataIndex: 'role_id',
      render: (value, record, index) => (
        <ComboBox
          onChange={changedValue =>
            onRoleChanged(value, record, index, changedValue)
          }
          style={{ width: 150 }}
          defaultValue={value}
          valueField="id"
          textField="name"
          type={ComboBoxType.Role}
        />
      ),
    },
    {
      title: '',
      className: 'actions-cell',
      width: '15%',
      key: 'action',
      sorter: false,
      render: (value, record, index) => (
        <Button.Group>
          <Button onClick={() => onDeleteUser(record.id)} type="link">
            {t('buttons.delete')}
          </Button>

          <Dropdown.Button placement="bottomRight" overlay={menu}>
            {t('buttons.actions')}
          </Dropdown.Button>
        </Button.Group>
      ),
    },
  ];
};
