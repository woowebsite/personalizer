import React from 'react';
import { Menu } from 'antd';
import Link from 'next/link';

const TopMenu = () => {
  return (
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
      <Menu.Item key="1">
        <Link href="/workflow">Bảng công việc</Link>{' '}
      </Menu.Item>
      <Menu.Item key="2">Tính lương</Menu.Item>
      <Menu.Item key="3">Báo cáo</Menu.Item>
    </Menu>
  );
};

export default TopMenu;
