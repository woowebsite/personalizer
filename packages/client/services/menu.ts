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
          visible: true,
          roles: [RoleType.SysAdmin],
        },
        {
          title: 'menu.users.createUser',
          key: 'dashboardBeta',
          url: '/admin/users/new',
          visible: true,
          roles: [RoleType.SysAdmin],
          permission: { featureName: 'User', code: PermissionActions.Create },
        },
        {
          title: 'menu.users.authorized',
          key: 'permission',
          url: '/admin/authorized/groups',
          visible: true,
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
          roles: [RoleType.SysAdmin],
          permission: { featureName: 'User', code: PermissionActions.Create },
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
          visible: true,
          roles: [RoleType.SysAdmin],
          permission: { featureName: 'User', code: PermissionActions.Read },
        },
        {
          title: 'menu.productBases.createProductBase',
          key: 'dashboardBeta',
          url: '/admin/productbases/new',
          visible: true,
          roles: [RoleType.SysAdmin],
          permission: { featureName: 'User', code: PermissionActions.Create },
        },
        {
          title: 'menu.productBases.updateProductBase',
          key: 'updateProductBase',
          url: '/admin/productbases/{id}',
          roles: [RoleType.SysAdmin, RoleType.Admin],
          visible: false,
          permission: {
            featureName: 'ProductBase',
            code: PermissionActions.Update,
          },
        },
      ],
    },
    {
      title: 'topbar',
      key: 'topbar',
      position: 'top',
      children: [
        {
          title: 'topBar.menu.report',
          key: 'report',
          icon: 'fe fe-home',
          url: '/report',
          visible: true,
          position: 'top',
          roles: [RoleType.SysAdmin, RoleType.Admin],
          permission: {},
        },
      ],
    },
  ];
}

export function getMenuByUrl(url) {
  let menuUrl = url;

  // get all children menu
  const menus = getMenuData().reduce((arr: any[], m) => {
    arr.push(...m.children);
    return arr;
  }, []);

  // For detail url. Ex: /customer/job/{id}
  const path = url.split('/');
  const lastWord = path[path.length - 1];
  if (+lastWord) {
    menuUrl = `/${path[1]}/${path[2]}/{id}`; //  Ex: /customer/job/{id}
  }

  const menu = menus.find(x => x.url === menuUrl);
  return menu;
}

export function hasPemission(session, url) {
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
