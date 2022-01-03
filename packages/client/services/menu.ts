import RoleType from '~/models/RoleType';
import _ from 'lodash';
import { PermissionActions } from '~/features/authorized/AuthorizedTable/constants';

export default function getMenuData() {
  return [
    {
      title: 'menu.settings.title',
      key: 'settings',
      icon: 'fe fe-home',
      count: 4,
      position: 'left',
      children: [
        {
          title: 'menu.settings.profile',
          key: 'profile',
          url: '/settings/profile',
        },
        {
          title: 'menu.users.createUser',
          key: 'dashboardBeta',
          url: '/admin/users/new',
          roles: [RoleType.SysAdmin],
          permission: { featureName: 'User', code: PermissionActions.Create },
        },
        {
          title: 'menu.users.authorized',
          key: 'permission',
          url: '/admin/authorized/groups',
          roles: [RoleType.SysAdmin],
          permission: { featureName: 'User', code: PermissionActions.Create },
        },
      ],
    },
    {
      title: 'menu.users.title',
      key: 'dashboards',
      icon: 'fe fe-home',
      roles: ['admin'],
      count: 4,
      position: 'left',
      children: [
        {
          title: 'menu.users.allUsers',
          key: 'dashboard',
          url: '/admin/users',
          roles: [RoleType.SysAdmin],
          permission: { featureName: 'User', code: PermissionActions.Read },
        },
        {
          title: 'menu.users.createUser',
          key: 'dashboardBeta',
          url: '/admin/users/new',
        },
      ],
    },
    {
      title: 'menu.productBases.title',
      key: 'dashboards',
      icon: 'fe fe-home',
      roles: ['admin'],
      count: 4,
      position: 'left',
      children: [
        {
          title: 'menu.productBases.allProductBase',
          key: 'dashboard',
          url: '/admin/productbases',
        },
        {
          title: 'menu.productBases.createProductBase',
          key: 'dashboardBeta',
          url: '/admin/productbases/new',
        },
      ],
    },
    {
      title: 'topbar',
      key: 'topbar',
      position: 'top',
      children: [
        {
          title: 'topbar.workflow',
          key: 'workflow',
          icon: 'fe fe-home',
          position: 'top',
          url: '/workflow',
          roles: [RoleType.SysAdmin],
          permission: {},
        },
        {
          title: 'topbar.salary',
          key: 'salary',
          icon: 'fe fe-home',
          url: '/salary',
          position: 'top',
          roles: [RoleType.SysAdmin],
          permission: {},
        },
        {
          title: 'topbar.report',
          key: 'report',
          icon: 'fe fe-home',
          url: '/report',
          position: 'top',
          roles: [RoleType.SysAdmin],
          permission: {},
        },
      ],
    },
  ];
}

export function getMenuByUrl(url) {
  const menus = getMenuData().reduce((arr: any[], m) => {
    arr.push(...m.children);
    return arr;
  }, []);

  const menu = menus.find(x => x.url === url);
  return menu;
}

export function hasPemission(session, url) {
  return true;    // TODO
  const menu = getMenuByUrl(url);
  const hasRole = menu.roles.includes(session.user.role_id);
  const userPermissions: any[] = session.user.role.permissions;
  const { featureName, code } = menu.permission;
  const userPermission = userPermissions.find(
    x => x.featureName === featureName,
  );
  const hasPermission = (userPermission && userPermission.code & code) !== 0;

  return hasRole && hasPermission;
}
