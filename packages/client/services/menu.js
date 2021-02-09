export default function getMenuData() {
  return [
    {
      title: 'menu.accounts.title',
      key: 'dashboards',
      icon: 'fe fe-home',
      roles: ['admin'],
      count: 4,
      children: [
        {
          title: 'menu.accounts.allAccounts',
          key: 'dashboard',
          url: '/dashboard/alpha',
        },
        {
          title: 'menu.accounts.createAccount',
          key: 'dashboardBeta',
          url: '/dashboard/beta',
        },
      ],
    },
  ];
}
