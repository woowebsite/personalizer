import { Menu } from 'antd';

const TopMenu = () => {
  return (
    <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['2']}>
      <Menu.Item key='1'>Bảng công việc</Menu.Item>
      <Menu.Item key='2'>Tính lương</Menu.Item>
      <Menu.Item key='3'>Báo cáo</Menu.Item>
    </Menu>
  );
};

export default TopMenu;
