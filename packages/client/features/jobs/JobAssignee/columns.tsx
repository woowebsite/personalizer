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

export const columns = (t): ColumnsType<any> => {
  return [
    {
      title: t('jobAssignee.columns.assignee'),
      dataIndex: 'assignee',
      key: 'assignee',
      width: '25%',
      render: (text, record) => {
        return record.assignee ? <Link href={`/admin/users/${record.assignee.id}`}>{record.assignee.name}</Link> : text;
      },
    },
    {
      title: t('jobAssignee.columns.action'),
      dataIndex: 'term',
      key: 'term',
      align: 'left',
      render: (text, record) => {
        return record.termTaxonomy.term.name
      },
    },
    {
      title: t('jobAssignee.columns.updatedAt'),
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: '25%',
    },
  ];
};
