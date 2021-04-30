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
      productBases: {
        title: 'Product bases',
        allProductBase: 'All Product bases',
        createProductBase: 'Create product base',
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
      delete: 'Delete',
      edit: 'Edit',
      actions: 'Actions',
      more: 'More',
      cancel: 'Cancel',
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
  '/admin/productbases': {
    title: 'Product Bases',
    subTitle: 'This is subtitle',
    pageHeader: {
      buttons: {
        create: 'Add new',
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
