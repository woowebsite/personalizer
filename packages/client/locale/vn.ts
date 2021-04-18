export const vn = {
  common: {
    topBar: {
      profileMenu: {
        profile: 'Thông tin cá nhân',
        logout: 'Đăng xuất',
      },
    },
    menu: {
      settings: {
        title: 'Cài đặt',
        changePassword: 'Đổi mật khẩu',
        profile: 'Thông tin cá nhân',
      },
      users: {
        title: 'Người dùng',
        allUsers: 'Danh sách người dùng',
        createUser: 'Tạo người dùng',
      },
      customers: {
        title: 'Khách hàng',
        allCustomers: 'Danh sách khách hàng',
        createCustomer: 'Tạo khách hàng',
      },
      jobs: {
        title: 'Công việc',
        allJobs: 'Danh sách công việc',
        createJob: 'Tạo công việc',
      },
    },
    validator: {
      required: 'Bạn vui lòng nhập {field}',
    },
    messages: {
      changePassword: {
        isValid: 'Mật khẩu hiện tại chưa đúng',
      },
    },
    buttons: {
      discard: 'Tạm hoãn',
      save: 'Lưu',
      create: 'Tạo mới',
      delete: 'Xoá',
      edit: 'Sửa',
      actions: 'Tác vụ',
      more: 'Thêm nữa',
      cancel: 'Tạm hoãn',
      filter: 'Lọc'
    },
    userTable: {
      columns: {
        id: 'Id',
        name: 'Tên',
        age: 'Tuổi',
        image: 'Ảnh đại diện',
        email: 'Email',
        phone: 'Điện thoại',
        role: 'Nhóm người dùng',
        createdAt: 'Ngày tạo',
      },
    },
    customerTable: {
      columns: {
        id: 'Id',
        name: 'Tên',
        image: 'Ảnh đại diện',
        facebook: 'Facebook',
        customerType: 'Nhóm khách hàng',
        createdAt: 'Ngày tạo',
      },
    },
    jobTable: {
      columns: {
        id: 'Id',
        title: 'Tiêu đề',
        link: 'Link',
        status: 'Trạng thái',
        priority: 'Ưu tiên',
        createdAt: 'Ngày tạo',
      },
    },
    jobCreateform: {
      label: {
        title: "Tiêu đề",
        link: "Link",
        priority: "Ưu tiên",
        status: "Trạng thái",
        dueDate: "Ngày hết hạn",
        description: "Ghi chú"
      },
    },
    customerCreateform: {
      label: {
        name: 'Tên',
        description: 'Ghi chú',
        image: 'Ảnh đại diện',
        email: 'Email',
        type: 'Loại khách hàng',
        address: 'Địa chỉ',
        phone: 'Số điện thoại',
      },
    },
   
    userCreateform: {
      label: {
        name: 'Tên',
        description: 'Mô tả',
        image: 'Ảnh đại diện',
        email: 'Email',
        role: 'Nhóm người dùng',
      },
    },
    tableQuickEdit: {
      btnQuickEdit: 'Sửa',
    },
    tableFilter: {
      tabFilter: {
        all: 'Tất cả',
      },
    },
    changePasswordForm: {
      label: {
        current: 'Mật khẩu hiện tại',
        password: 'Mật khẩu mới',
        confirmPassword: 'Xác nhận mật khẩu',
      },
    },
    socialConnect: {
      title: 'Mạng xã hội',
      connectToFacebook: 'Đã kết nối Facebook',
      connectToTwitter: 'Đã kết nối twitter',
      connectToGoogle: 'Đã kết nối Google',
    },
  },
  '/login': {
    signin: 'Đăng nhập',
  },
  '/admin/users': {
    title: 'Danh sách người dùng',
    subTitle: 'This is subtitle',
    pageHeader: {
      buttons: {
        create: 'Thêm người dùng',
      },
    },
  },
  '/admin/customers': {
    title: 'Danh sách khách hàng',
    subTitle: 'This is subtitle',
    pageHeader: {
      buttons: {
        create: 'Thêm khách hàng',
      },
    },
  },
  '/customer/jobs': {
    title: 'Danh sách công việc',
    subTitle: 'This is subtitle',
    pageHeader: {
      buttons: {
        create: 'Tạo mới',
        all: 'Danh sách công việc'
      },
    },
  },
  '/customer/jobs/new': {
    title: 'Tạo công việc',
    subTitle: 'This is subtitle',
    pageHeader: {
      buttons: {
        create: 'Tạo mới',
        all: 'Danh sách công việc'
      },
    },
  },
  '/admin/users/new': {
    title: 'Tạo người dùng',
  },
  '/admin/users/[id]': {
    title: 'Cập nhật người dùng',
    pageHeader: {
      buttons: {
        save: 'Lưu',
      },
    },
    changePasswordBox: {
      title: 'Thay đổi mật khẩu',
    },
    socialBox: {
      title: 'Mạng xã hội',
    },
  },
  
  '/settings/profile': {
    title: 'Thông tin cá nhân',
    changePassword: {
      title: 'Đổi mật khẩu',
    },
    socialBox: {
      title: 'Liên kết mạng xã hội',
    },
  },
};
