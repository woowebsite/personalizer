import { Layout, Menu, Breadcrumb } from 'antd';
import Router from 'next/router';
import { useIntl } from 'react-intl';
import MenuLeft from './MenuLeft';
import getMenuData from 'services/menu';
import { getSession } from 'next-auth/client';
import RoleType from '~/models/RoleType';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function withAdminLayout(WrappedComponent) {
  const AdminLayout = (props) => {
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

  AdminLayout.getInitialProps = async (context) => {
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

    // Permission check
    console.log('session.user.roleId', session.user.roleId);

    if (session.user.roleId !== RoleType.SysAdmin) {
      ctx.res.writeHead(302, { Location: '/login' });
      ctx.res.end();
    }

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(context));

    return { ...componentProps, session };
  };

  return AdminLayout;
}

export default withAdminLayout;
