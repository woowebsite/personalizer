import { Layout, Menu, Breadcrumb } from 'antd';
import TopBar from '~/components/TopBar';
import MenuLeft from './MenuLeft';
import getMenuData from 'services/menu';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const BasicLayout = props => {
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <TopBar data={getMenuData()}/>
      </Header>

      <Layout>
        <Sider width={200} className="site-layout-background">
          <MenuLeft data={getMenuData()} />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
