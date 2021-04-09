import { Layout, Menu, Breadcrumb } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { Component } from 'react';
import Router from 'next/router';
import { getSession } from 'next-auth/client';

import TopBar from '~/components/TopBar';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const withUserLayout = WrappedComponent =>
  class extends Component {
    static async getInitialProps(context) {
      const { ctx } = context;
      const session = await getSession({ req: ctx.req });

      /*
       * This happens on server only, ctx.req is available means it's being
       * rendered on server. If we are on server and token is not available,
       * means user is not logged in.
       */
      if (ctx.req && !session) {
        ctx.res.writeHead(302, { Location: '/login' });
        ctx.res.end();
        return;
      }

      // We already checked for server. This should only happen on client.
      if (!session && typeof window !== 'undefined') {
        Router.push('/login');
      }

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(context));

      return { ...componentProps, session };
    }

    constructor(props) {
      super(props);
    }
    render() {
      const { props } = this;
      return (
        <Layout>
          <Header className="header">
            <div className="logo" />
            <TopBar />
          </Header>
          <Layout>
            <Sider width={200} className="site-layout-background">
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
              >
                <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                  <Menu.Item key="1">
                    <Link href="/">Home</Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Link href="/user/albums">Albums</Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Link href="/user/members">Members</Link>
                  </Menu.Item>
                  <Menu.Item key="4">option3</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                  <Menu.Item key="5">option5</Menu.Item>
                  <Menu.Item key="6">option6</Menu.Item>
                  <Menu.Item key="7">option7</Menu.Item>
                  <Menu.Item key="8">option8</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub3"
                  icon={<NotificationOutlined />}
                  title="subnav 3"
                >
                  <Menu.Item key="9">option9</Menu.Item>
                  <Menu.Item key="10">option10</Menu.Item>
                  <Menu.Item key="11">option11</Menu.Item>
                  <Menu.Item key="12">option12</Menu.Item>
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
                className="site-layout-background"
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
    }
  };

export default withUserLayout;
