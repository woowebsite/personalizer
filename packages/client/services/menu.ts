import RoleType from '~/models/RoleType';
import _ from 'lodash';
import { PermissionActions } from '~/features/authorized/AuthorizedTable/constants';

export default function getMenuData() {
  return [
    {
      title: 'menu.settings.title',
      key: 'settings',
      icon: 'Setting',
      count: 4,
      position: 'left',
      roles: [RoleType.SysAdmin],
      children: [
        {
          title: 'menu.settings.configuration',
          key: 'configuration',
          url: '/settings/configuration',
          visible: true,
          roles: [RoleType.SysAdmin],
          permission: {},
        },
        {
          title: 'menu.settings.profile',
          key: 'profile',
          url: '/settings/profile',
          visible: true,
          roles: [RoleType.SysAdmin],
          permission: {},
        },
        {
          title: 'menu.settings.changePassword',
          key: 'changePassword',
          url: '/settings/changePassword',
          visible: true,
          roles: [RoleType.SysAdmin],
        },
      ],
    },
    {
      title: 'menu.users.title',
      key: 'users',
      icon: 'Calendar',
      roles: [RoleType.SysAdmin],
      count: 4,
      position: 'left',
      children: [
        {
          title: 'menu.users.allUsers',
          key: 'allUsers',
          url: '/users',
          visible: true,
          roles: [RoleType.SysAdmin],
          permission: { featureName: 'User', code: PermissionActions.Read },
        },
        {
          title: 'menu.users.createUser',
          key: 'createUser',
          url: '/users/new',
          visible: true,
          roles: [RoleType.SysAdmin],
          permission: { featureName: 'User', code: PermissionActions.Create },
        },
        {
          title: 'menu.users.updateUser',
          key: 'updateUser',
          url: '/users/{id}',
          roles: [RoleType.SysAdmin],
          visible: false,
          permission: {
            featureName: 'User',
            code: PermissionActions.Update,
          },
        },
        {
          title: 'menu.users.authorized',
          key: 'permission',
          url: '/authorized/groups',
          visible: true,
          roles: [RoleType.SysAdmin],
          permission: { featureName: 'User', code: PermissionActions.Create },
        },
      ],
    },
    {
      title: 'menu.productBases.title',
      key: 'productbases',
      icon: 'Photo',
      roles: [RoleType.SysAdmin],
      count: 4,
      position: 'left',
      children: [
        {
          title: 'menu.productBases.allProductBase',
          key: 'allProductBase',
          url: '/productbases',
          visible: true,
          roles: [RoleType.SysAdmin],
        },
        {
          title: 'menu.productBases.createProductBase',
          key: 'createProductBase',
          url: '/productbases/new',
          visible: true,
          roles: [RoleType.SysAdmin],
        },
      ],
    },
  ];
}

export const topMenu = [
  {
    title: 'topbar.report',
    key: 'report',
    icon: 'fe fe-home',
    url: '/report',
    position: 'top',
    roles: [RoleType.SysAdmin],
    permission: {},
  },
];

export function getMenuByUrl(url) {
  const menus = getMenuData().reduce((arr: any[], m) => {
    arr.push(...m.children);
    return arr;
  }, []);

  const menu = menus.find(x => x.url === url);
  return menu;
}

export function hasPemission(session, url) {
  return true; // TODO
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
