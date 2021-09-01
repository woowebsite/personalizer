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
      position: 'left',
      roles: [RoleType.SysAdmin],
      children: [
        {
          title: 'menu.users.allUsers',
          key: 'dashboard',
          url: '/admin/users',
          visible: true,
          roles: [RoleType.SysAdmin],
          permission: { featureName: 'User', code: PermissionActions.Read },
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
          title: 'menu.users.updateUser',
          key: 'update',
          url: '/admin/users/{id}',
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
          url: '/admin/authorized/groups',
          visible: true,
          roles: [RoleType.SysAdmin],
          permission: { featureName: 'User', code: PermissionActions.Create },
        },
      ],
    },
    {
      title: 'menu.customers.title',
      key: 'dashboards',
      icon: 'fe fe-home',
      count: 4,
      position: 'left',
      roles: [RoleType.SysAdmin],
      children: [
        {
          title: 'menu.customers.allCustomers',
          key: 'all',
          url: '/admin/customers',
          visible: true,
          roles: [RoleType.SysAdmin, RoleType.Customer],
          permission: { featureName: 'Customer', code: PermissionActions.Read },
        },
        {
          title: 'menu.customers.createCustomer',
          key: 'new',
          url: '/admin/customers/new',
          visible: true,
          roles: [RoleType.SysAdmin, RoleType.Customer],
          permission: {
            featureName: 'Customer',
            code: PermissionActions.Create,
          },
        },
      ],
    },
    {
      title: 'menu.jobs.title',
      key: 'dashboards',
      icon: 'fe fe-home',
      roles: [
        RoleType.SysAdmin,
        RoleType.HelpDesk,
        RoleType.Customer,
        RoleType.Leader,
        RoleType.Employee,
      ],
      count: 4,
      position: 'left',
      children: [
        {
          title: 'menu.jobs.allJobs',
          key: 'all',
          url: '/jobs',
          visible: true,
          roles: [RoleType.SysAdmin, RoleType.HelpDesk],
          permission: { featureName: 'Job', code: PermissionActions.Read },
        },
        {
          title: 'menu.jobs.myJobs',
          key: 'all',
          url: '/user/myjobs',
          visible: true,
          roles: [RoleType.Employee, RoleType.Customer, RoleType.Leader],
          permission: { featureName: 'Job', code: PermissionActions.Read },
        },
        {
          title: 'menu.jobs.createJob',
          key: 'new',
          url: '/jobs/new',
          visible: true,
          roles: [RoleType.SysAdmin, RoleType.Customer],
          permission: {
            featureName: 'Customer',
            code: PermissionActions.Create,
          },
        },
        {
          title: 'menu.jobs.updateJob',
          key: 'update',
          url: '/jobs/{id}',
          roles: [RoleType.SysAdmin, RoleType.Customer, RoleType.Employee],
          visible: false,
          permission: {
            featureName: 'Customer',
            code: PermissionActions.Update,
          },
        },
      ],
    },
    {
      title: 'menu.settings.title',
      key: 'settings',
      icon: 'fe fe-home',
      count: 1,
      position: 'left',
      roles: [
        RoleType.SysAdmin,
        RoleType.Customer,
        RoleType.Employee,
        RoleType.HelpDesk,
        RoleType.Leader,
      ],
      children: [
        {
          title: 'menu.settings.configuration',
          key: 'configuration',
          url: '/settings/configuration',
          visible: true,
          roles: [
            RoleType.SysAdmin,
            RoleType.HelpDesk,
          ],
          permission: {},
        },
        {
          title: 'menu.settings.profile',
          key: 'profile',
          url: '/settings/profile',
          visible: true,
          roles: [
            RoleType.SysAdmin,
            RoleType.Customer,
            RoleType.Employee,
            RoleType.HelpDesk,
            RoleType.Leader,
          ],
          permission: {},
        },
        {
          title: 'menu.settings.changePassword',
          key: 'changePassword',
          url: '/settings/changePassword',
          visible: true,
          roles: [
            RoleType.SysAdmin,
            RoleType.Customer,
            RoleType.Employee,
            RoleType.HelpDesk,
            RoleType.Leader,
          ],
        },
      ],
    },
    {
      title: 'topbar',
      key: 'topbar',
      position: 'top',
      roles: [RoleType.SysAdmin],
      children: [
        {
          title: 'topbar.workflow',
          key: 'workflow',
          icon: 'fe fe-home',
          position: 'top',
          url: '/workflow',
          visible: true,
          roles: [
            RoleType.SysAdmin,
            RoleType.Customer,
            RoleType.Employee,
            RoleType.HelpDesk,
            RoleType.Leader,
          ],
          permission: {},
        },
        {
          title: 'topbar.salary',
          key: 'salary',
          icon: 'fe fe-home',
          url: '/salary',
          visible: true,
          position: 'top',
          roles: [
            RoleType.SysAdmin,
            RoleType.Customer,
            RoleType.Employee,
            RoleType.HelpDesk,
            RoleType.Leader,
          ],
          permission: {},
        },
        {
          title: 'topbar.report',
          key: 'report',
          icon: 'fe fe-home',
          url: '/report',
          visible: true,
          position: 'top',
          roles: [RoleType.SysAdmin, RoleType.HelpDesk],
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
  if (url === '/') {
    return true;
  }

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
