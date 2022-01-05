import { useIntl } from 'react-intl';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';

import Menu from 'components/Menu';
import Icon from 'components/Icon';

import style from './style.module.scss';

const { Item, SubMenu } = Menu;

const MenuLeft = props => {
  const { formatMessage } = useIntl();
  const f = id => formatMessage({ id });
  const { session, data } = props;
  const { user } = session;
  const router = useRouter();
  const pathname = router?.pathname;
  
  const filterMenu = data
  .filter(x => x.position === 'left' && x.roles.includes(user.role_id));

  const activeKey = () => {
    let openKeys = '';
    let selectedKeys = '';
    filterMenu.map((menu) => {
      if (menu.children){
        menu.children.forEach(child => {
          if(pathname === child.url){
            openKeys = menu.key;
            selectedKeys = child.key;
          }
        })
      }
    })
    return { openKeys, selectedKeys };
  }

  return (
    <Menu
      mode="inline"
      style={{ height: '100%', borderRight: 0 }}
      className={style["menu-left"]}
      defaultOpenKeys={[activeKey().openKeys]}
      selectedKeys={[activeKey().selectedKeys]}
    >
      {filterMenu
        .map((menu, i) => {
          //Group menu
          if (menu.children) {
            return (
              <SubMenu
                key={menu.key}
                icon={<Icon icon={menu.icon} />}
                title={f(menu.title)}
              >
                {menu.children
                  .filter(
                    x => x.visible === true && x.roles.includes(user.role_id),
                  )
                  .map((child, c) => (
                    <Item key={child.key}>
                      <Link href={child.url}>{f(child.title)}</Link>
                    </Item>
                  ))}
              </SubMenu>
            );
          } else {
            // Single menu
            return (
              <Item key={menu.key}>
                <Link href={menu.url}>{f(menu.title)}</Link>
              </Item>
            );
          }
        })}
    </Menu>
  );
};

export default MenuLeft;
