import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useIntl } from 'react-intl';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const withAdminLayout = (WrappedComponent) => (props) => {
  const { formatMessage, messages } = useIntl();
  const f = (id) => formatMessage({ id });
  
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
          <Menu
            mode='inline'
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <SubMenu key='sub1' icon={<UserOutlined />} title='subnav 1'>
              <Menu.Item key='1'>
                <Link href='/'>{f('menu.subnav1.accounts')}</Link>
              </Menu.Item>
              <Menu.Item key='2'>
                <Link href='/admin/accounts'>{messages.title}</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className='site-layout-background'
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <WrappedComponent {...props} />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default withAdminLayout;
