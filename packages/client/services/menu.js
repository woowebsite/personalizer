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
          url: '/admin/jobs',
        },
        {
          title: 'menu.jobs.createJob',
          key: 'new',
          url: '/admin/jobs/new',
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
