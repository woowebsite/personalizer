import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import MenuLeft from './MenuLeft';
import getMenuData from 'services/menu';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const withAdminLayout = (WrappedComponent) => (props) => {
  const { formatMessage, messages } = useIntl();
  const t = (id) => formatMessage({ id });

  return (
    <Layout>
      <Header className='header'>
        <div className='logo' />
        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['2']}>
          <Menu.Item key='1'>nav 1</Menu.Item>
          <Menu.Item key='2'>nav 2</Menu.Item>
          <Menu.Item key='3'>nav 3</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} className='site-layout-background'>
          <MenuLeft data={getMenuData()} />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <WrappedComponent t={t} messages={messages} {...props} />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default withAdminLayout;
