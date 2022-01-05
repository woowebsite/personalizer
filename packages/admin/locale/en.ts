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
        configuration: 'General',
        changePassword: 'Change password',
        profile: 'Basic information',
      },
      users: {
        title: 'Users',
        allUsers: 'All users',
        createUser: 'Create an user',
        authorized: 'Permission',
      },
      productBases: {
        title: 'Product bases',
        allProductBase: 'All Product bases',
        createProductBase: 'Create product base',
      },
    },
    topbar: {
      report: 'Report',
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
      filter: 'Filter',
      create: 'Create',
      upload: 'Upload',
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
    authorizedTable: {
      columns: {
        featureName: 'Feature',
        full: 'Full',
        create: 'Create',
        update: 'Update',
        delete: 'Delete',
        read: 'Read',
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
    signin: {
      title: 'Sign In',
      noAccount: 'Did you have an account',
      placeholder: {
        email: 'Email',
        password: 'Password',
      },
      buttons: {
        login: 'Login',
        loginWithEmail: 'Login with Email',
        forgotPass: 'Forgot your password?',
      },
    },
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
