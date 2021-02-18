export default function getMenuData() {
  return [
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
  ];
}
