import RoleType from '~/models/RoleType';
import _ from 'lodash';
import { PermissionActions } from '~/features/authorized/AuthorizedTable/constants';

export default function getMenuData() {
  return [
    {
      title: 'menu.users.title',
      key: 'dashboards',
      icon: 'fe fe-home',
      count: 4,
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
        {
          title: 'menu.users.authorized',
          key: 'permission',
          url: '/admin/authorized/groups',
        },
      ],
    },
    {
      title: 'menu.customers.title',
      key: 'dashboards',
      icon: 'fe fe-home',
      roles: ['admin'],
      count: 4,
      children: [
        {
          title: 'menu.customers.allCustomers',
          key: 'all',
          url: '/admin/customers',
          roles: [RoleType.SysAdmin],
          permission: { featureName: 'Customer', code: PermissionActions.Read },
        },
        {
          title: 'menu.customers.createCustomer',
          key: 'new',
          url: '/admin/customers/new',
        },
      ],
    },
    {
      title: 'menu.jobs.title',
      key: 'dashboards',
      icon: 'fe fe-home',
      roles: ['admin'],
      count: 4,
      children: [
        {
          title: 'menu.jobs.allJobs',
          key: 'all',
          url: '/customer/jobs',
        },
        {
          title: 'menu.jobs.createJob',
          key: 'new',
          url: '/customer/jobs/new',
        },
      ],
    },
    {
      title: 'menu.settings.title',
      key: 'settings',
      icon: 'fe fe-home',
      count: 1,
      children: [
        {
          title: 'menu.settings.profile',
          key: 'profile',
          url: '/settings/profile',
        },
        {
          title: 'menu.settings.changePassword',
          key: 'changePassword',
          url: '/settings/changePassword',
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
  const menu = getMenuByUrl(url);
  const hasRole = menu.roles.includes(session.user.role_id);
  const userPermissions: any[] = session.user.role.permissions;
  const { featureName, code } = menu.permission;
  const userPermission = userPermissions.find(
    x => x.featureName === featureName,
  );
  const hasPermission = (userPermission && userPermission.code & code) !== 0;
  console.log('hasRole', hasRole);
  console.log('userPermissions', userPermissions);

  return hasRole && hasPermission;
}
