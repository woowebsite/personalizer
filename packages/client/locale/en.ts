export const en = {
  common: {
    topBar: {
      profileMenu: {
        profile: 'Basic information',
        logout: 'Log out',
      },
    },
    menu: {
      settings: {
        title: 'Settings',
        changePassword: 'Change password',
        profile: 'Basic information',
      },
      users: {
        title: 'Users',
        allUsers: 'All users',
        createUser: 'Create an user',
      },
      customers: {
        title: 'Customers',
        allCustomers: 'All Customer',
        createCustomer: 'Create Customer',
      },
      jobs: {
        title: 'Jobs',
        allJobs: 'All Jobs',
        createJob: 'Create Job',
      },
    },
    validator: {
      required: 'Please input {field}',
    },
    messages: {
      changePassword: {
        isValid: 'Current password is invalid',
      },
    },
    buttons: {
      discard: 'Discard',
      save: 'Save',
      create: 'Create',
      delete: 'Delete',
      edit: 'Edit',
      actions: 'Actions',
      more: 'More',
      cancel: 'Cancel',
      filter: 'Filter'
    },
    userTable: {
      columns: {
        id: 'Id',
        name: 'Name',
        age: 'Age',
        image: 'Avatar',
        email: 'Email',
        phone: 'Phone',
        role: 'Role',
        createdAt: 'Created At',
      },
    },
    customerTable: {
      columns: {
        id: 'Id',
        name: 'Name',
        image: 'Avatar',
        facebook: 'Facebook',
        customerType: 'Type',
        createdAt: 'Created At',
      },
    },
    jobTable: {
      columns: {
        id: 'Id',
        title: 'Title',
        link: 'Link',
        status: 'Status',
        priority: 'Priority',
        createdAt: 'Created At',
      },
    },
    jobCreateform: {
      label: {
        title: "Title",
        link: "Link",
        priority: "Priority",
        status: "Status",
        dueDate: "DueDate",
        description: "Notes"
      },
    },
    customerCreateform: {
      label: {
        name: 'Name',
        description: 'Description',
        image: 'Image',
        email: 'Email',
        type: 'Customer type',
        address: 'Address',
        phone: 'Phone',
      },
    },
    productBaseTable: {
      columns: {
        id: 'Id',
        title: 'Title',
        createdAt: 'Created At',
      },
    },
    productBaseBasicForm: {
      label: {
        title: 'Title',
        description: 'Description',
        provider: 'Provider',
        thumbnails: 'Thumbnails',
        categories: 'Categories',
        tags: 'Tags',
      },
    },
    userCreateform: {
      label: {
        name: 'Name',
        description: 'Description',
        image: 'Image',
        email: 'Email',
        role: 'Role',
      },
    },
    tableQuickEdit: {
      btnQuickEdit: 'Edit',
    },
    tableFilter: {
      tabFilter: {
        all: 'All',
      },
    },
    changePasswordForm: {
      label: {
        current: 'Current Password',
        password: 'New Password',
        confirmPassword: 'Confirm Password',
      },
    },
    socialConnect: {
      title: 'Social Network',
      connectToFacebook: 'Connected Facebook',
      connectToTwitter: 'Connected Twitter',
      connectToGoogle: 'Connected Google',
    },
  },
  '/login': {
    signin: 'Sign In',
  },
  '/admin/users': {
    title: 'All users',
    subTitle: 'This is subtitle',
    pageHeader: {
      buttons: {
        create: 'Add user',
      },
    },
  },
  '/admin/customers': {
    title: 'All customers',
    subTitle: 'This is subtitle',
    pageHeader: {
      buttons: {
        create: 'Add customer',
      },
    },
  },
  '/jobs': {
    title: 'Job',
    subTitle: 'This is subtitle',
    pageHeader: {
      buttons: {
        create: 'Add new',
        all: 'All jobs'
      },
    },
  },
  '/jobs/new': {
    title: 'Create a job',
    subTitle: 'This is subtitle',
    pageHeader: {
      buttons: {
        create: 'Add job',
        all: 'All jobs'
      },
    },
  },
  '/admin/users/new': {
    title: 'Create an user',
  },
  '/admin/users/[id]': {
    title: 'Update user',
    pageHeader: {
      buttons: {
        save: 'Save',
      },
    },
    changePasswordBox: {
      title: 'Change password',
    },
    socialBox: {
      title: 'Social',
    },
  },
  '/user/albums': {
    title: 'All album',
    subTitle: 'This is subtitle',
    pageHeader: {
      buttons: {
        create: 'Add album',
      },
    },
    tableAccount: {
      columns: {
        id: 'Id',
        name: 'Name',
        age: 'Age',
        createdAt: 'Created At',
      },
    },
  },
  '/settings/profile': {
    title: 'Basic Information',
    changePassword: {
      title: 'Change Password',
    },
    socialBox: {
      title: 'Social Network',
    },
  },
};
