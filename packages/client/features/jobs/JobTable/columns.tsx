import Link from 'next/link';
import { ColumnsType } from 'antd/lib/table';
import { Table, Space, Menu, Dropdown, Modal, Button } from 'antd';
import {
  DownOutlined,
  UserOutlined,
  MoreOutlined,
  CloseCircleFilled,
} from '@ant-design/icons';
import Avatar from 'components/Avatar';
import ComboBoxEnum from '~/components/ComboBoxEnum';
import CustomerType from '~/models/CustomerType';
import ButtonModal from '~/components/ButtonModal';

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
  const configDeleteModal = record => ({
    icon: <CloseCircleFilled style={{ color: 'rgb(244, 85, 53)' }} />,
    title: t('jobTable.deleteModal.title'),
    content: t('jobTable.deleteModal.content'),
    onOk() {
      onDeleteJob(record.id);
    },
  });

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
        return text ? (
          <Link href={`/customer/jobs/${record.id}`}>{text}</Link>
        ) : (
          text
        );
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
          <ButtonModal config={configDeleteModal(record)} type="link">
            {t('buttons.delete')}
          </ButtonModal>

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
