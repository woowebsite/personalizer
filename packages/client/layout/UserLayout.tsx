import { Layout, Menu, Breadcrumb } from 'antd';
import Router from 'next/router';
import { useIntl } from 'react-intl';
import MenuLeft from './MenuLeft';
import getMenuData, { hasPemission } from 'services/menu';
import { getSession } from 'next-auth/client';

// components
import TopBar from '~/components/TopBar';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function withUserLayout(WrappedComponent) {
  const UserLayout = props => {
    const { formatMessage, messages } = useIntl();
    const t = id => formatMessage({ id });

    return (
      <Layout>
        <Header className="header">
          <TopBar data={getMenuData()} />
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <MenuLeft data={getMenuData()} />
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <WrappedComponent t={t} messages={messages} {...props} />
          </Layout>
        </Layout>
      </Layout>
    );
  };

  UserLayout.getInitialProps = async context => {
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

    if (!hasPemission(session, ctx.req.url)) {
      console.error('Error: You have not permission to access', session.user);
      ctx.res.writeHead(302, { Location: '/login' });
      ctx.res.end();
    }

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(context));

    return { ...componentProps, session };
  };

  return UserLayout;
}

export default withUserLayout;
