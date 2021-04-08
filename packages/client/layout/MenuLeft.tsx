import { Menu, Breadcrumb } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl';

import Link from 'next/link';

const { SubMenu } = Menu;

const MenuLeft = (props) => {
  const { formatMessage } = useIntl();
  const f = (id) => formatMessage({ id });

  return (
    <Menu
      mode='inline'
      defaultSelectedKeys={['0']}
      defaultOpenKeys={['menu0']}
      style={{ height: '100%', borderRight: 0 }}
    >
      {props.data.map((menu, i) => {
        //Group menu
        if (menu.children) {
          return (
            <SubMenu
              key={`menu-${i}`}
              icon={<UserOutlined />}
              title={f(menu.title)}
            >
              {menu.children.map((child, c) => (
                <Menu.Item key={`child-menu-${c}`}>
                  <Link href={child.url}>{f(child.title)}</Link>
                </Menu.Item>
              ))}
            </SubMenu>
          );
        } else {
          // single menu
          return (
            <Menu.Item key={`menu${i}`}>
              <Link href={menu.url}>{f(menu.title)}</Link>
            </Menu.Item>
          );
        }
      })}
    </Menu>
  );
};

export default MenuLeft;
