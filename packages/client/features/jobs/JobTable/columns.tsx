import Link from 'next/link';
import { ColumnsType } from 'antd/lib/table';
import { Table, Space, Menu, Dropdown, Modal, Button } from 'antd';
import {
  DownOutlined,
  UserOutlined,
  SendOutlined,
  MenuOutlined,
  CloseCircleFilled,
} from '@ant-design/icons';
import Avatar from 'components/Avatar';
import ComboBoxEnum from '~/components/ComboBoxEnum';
import CustomerType from '~/models/CustomerType';
import ButtonModal from '~/components/ButtonModal';
import managementJobAuthConfig from '../authorized/managementJob';
import React from 'react';
import AuthorizedWrapper from '~/components/AuthorizedWrapper';
import { formatMoney } from '~/shared/formatHelper';

const menu = (t, actions) => (
  <Menu>
    <Menu.Item key="1" icon={<SendOutlined />} onClick={actions.send}>
      {t('buttons.send')}
    </Menu.Item>
    <Menu.Item key="2" icon={<SendOutlined />}>
      {t('buttons.payment')}
    </Menu.Item>
  </Menu>
);

export const columns = (session, t, handlers): ColumnsType<any> => {
  const configDeleteModal = record => ({
    icon: <CloseCircleFilled style={{ color: 'rgb(244, 85, 53)' }} />,
    title: t('jobTable.deleteModal.title'),
    content: t('jobTable.deleteModal.content'),
    onOk() {
      handlers.delete(record.id);
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
        return text ? <Link href={`/jobs/${record.id}`}>{text}</Link> : text;
      },
    },
    {
      title: t('jobTable.columns.cost'),
      dataIndex: 'cost',
      key: 'cost',
      width: '25%',
      render(text, record) {
        return (
          <div className="text-danger">{text ? formatMoney(text) : ''} </div>
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

          <Button onClick={() => handlers.view(record)} type="link">
            {t('buttons.edit')}
          </Button>

          <Dropdown
            placement="bottomRight"
            overlay={menu(t, { send: () => handlers.send(record) })}
          >
            <Button type="text">
              <MenuOutlined />
            </Button>
          </Dropdown>
        </Button.Group>
      ),
    },
  ];
};
