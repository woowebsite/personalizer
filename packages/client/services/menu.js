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
          url: '/admin/accounts',
        },
        {
          title: 'menu.accounts.createAccount',
          key: 'dashboardBeta',
          url: '/admin/accounts/create',
        },
      ],
    },
  ];
}
