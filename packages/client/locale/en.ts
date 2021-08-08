export const en = {
  common: {
    topBar: {
      menu: {
        report: 'Report',
      },
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
        authorized: 'Authorization',
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
      addNew: 'Add new',
      discard: 'Discard',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      actions: 'Actions',
      more: 'More',
      cancel: 'Cancel',
    },
    authorizedTable: {
      columns: {
        featureName: 'Features',
        full: 'Full',
        create: 'Create',
        update: 'Update',
        delete: 'Delete',
        read: 'List',
      },
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
    productBaseVariation: {
      title: 'Variation box',
      tabs: {
        general: {
          title: 'General',
          label: {
            sku: 'SKU',
            basePrice: 'Base Price',
            retailPrice: 'Retail Price',
            quantity: 'Quantity',
          }
        },
        attributes: 'Attributes',
        variations: 'Variations',
        swatches: 'Swatches',
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
  '/admin/productbases/new': {
    title: 'Product Bases',
    subTitle: 'This is subtitle',
    pageHeader: {
      buttons: {
        create: 'Add new',
      },
    },
    publishBox: {
      title: 'Publish',
      label: {
        status: 'Status',
        visibility: 'Visibility',
        publish: 'Publish',
      },
    },
    printAreaBox: {
      title: 'Print Areas',
      columns: {
        name: 'Name',
        width: 'Width',
        height: 'Height',
        action: 'Action',
      },
    },
    combinePrintAreaBox: {
      title: 'Combine Print Areas',
      columns: {
        name: 'Name',
        width: 'Width',
        height: 'Height',
        action: 'Action',
      },
    },
    mockupBox: {
      title: 'Mockups',
      fields: {
        name: 'Name',
        background: 'Background',
        dimensions: 'Dimensions',
        preview: 'Preview',
        noise: 'Noise',
        renderNoise: 'Render Noise',
        renderNoiseDesc:
          'Extra noise layer will be placed on the top of your mockup to make it look more realistic',
      },
    },
  },
  '/admin/productbases/[id]': {
    title: 'Product Bases',
    subTitle: 'This is subtitle',
    pageHeader: {
      buttons: {
        create: 'Add new',
      },
    },
    publishBox: {
      title: 'Publish',
      label: {
        status: 'Status',
        visibility: 'Visibility',
        publish: 'Publish',
      },
    },
    printAreaBox: {
      title: 'Print Areas',
      columns: {
        name: 'Name',
        width: 'Width',
        height: 'Height',
        action: 'Action',
      },
    },
    combinePrintAreaBox: {
      title: 'Combine Print Areas',
      columns: {
        name: 'Name',
        width: 'Width',
        height: 'Height',
        action: 'Action',
      },
    },
    mockupBox: {
      title: 'Mockups',
      fields: {
        name: 'Name',
        background: 'Background',
        dimensions: 'Dimensions',
        preview: 'Preview',
        noise: 'Noise',
        renderNoise: 'Render Noise',
        renderNoiseDesc:
          'Extra noise layer will be placed on the top of your mockup to make it look more realistic',
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
