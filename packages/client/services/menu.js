export default function getMenuData() {
  return [
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
    {
      title: 'menu.users.title',
      key: 'dashboards',
      icon: 'fe fe-home',
      roles: ['admin'],
      count: 4,
      children: [
        {
          title: 'menu.users.allUsers',
          key: 'dashboard',
          url: '/admin/users',
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
  ];
}
