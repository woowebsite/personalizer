export const vi = {
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
      filter: 'Lọc',
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
        description: 'Mô tả',
        priority: 'Ưu tiên',
        createdAt: 'Ngày tạo',
      },
      deleteModal: {
        title: 'Xoá công việc',
        content: 'Bạn thực sự muốn xoá công việc này?',
      },
    },
    jobCreateform: {
      label: {
        title: 'Tiêu đề',
        link: 'Link',
        priority: 'Ưu tiên',
        status: 'Trạng thái',
        publishDate: 'Ngày gửi',
        dueDate: 'Ngày dự kiến',
        description: 'Ghi chú',
        demoColor: 'Demo mầu',
        demoLayout: 'Demo layout',
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
      connectToFacebook: 'Facebook',
      connectToTwitter: 'Twitter',
      connectToGoogle: 'Google',
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
  '/admin/customers/new': {
    title: 'Tạo khách hàng',
    subTitle: 'This is subtitle',
    pageHeader: {
      buttons: {
        create: 'Thêm khách hàng',
        allCustomers: 'Danh sách khách hàng',
      },
    },
    customerMoney: {
      title: 'Tài khoản',
      buttons: {
        addMoney: 'Nạp tiền',
        cancel: 'Tạm hoãn',
      },
      label: {
        money: 'Tiền',
        debt: 'Công nợ',
      },
    },
  },
  '/admin/customers/[id]': {
    title: 'Tạo khách hàng',
    subTitle: 'This is subtitle',
    pageHeader: {
      buttons: {
        create: 'Thêm khách hàng',
        allCustomers: 'Danh sách khách hàng',
      },
    },
    customerMoney: {
      title: 'Tài khoản',
      buttons: {
        addMoney: 'Nạp tiền',
        cancel: 'Tạm hoãn',
      },
      label: {
        money: 'Tiền',
        debt: 'Công nợ',
      },
    },
  },
  '/customer/jobs': {
    title: 'Danh sách công việc',
    subTitle: 'This is subtitle',
    pageHeader: {
      buttons: {
        create: 'Tạo mới',
        all: 'Danh sách công việc',
      },
    },
  },
  '/customer/jobs/new': {
    title: 'Tạo công việc',
    subTitle: 'This is subtitle',
    pageHeader: {
      buttons: {
        create: 'Tạo mới',
        all: 'Danh sách công việc',
      },
    },
    jobStatus: {
      title: 'Tình trạng công việc',
      label: {
        status: 'Tình trạng',
        employee: 'Thợ ảnh',
        leader: 'Leader',
      },
    },
    jobMoney: {
      title: 'Chi phí',
      label: {
        paid: 'Đã thanh toán',
        debt: 'Còn nợ',
      },
    },
  },
  '/customer/jobs/[id]': {
    title: 'Chưa đặt tiêu đề',
    subTitle: 'This is subtitle',
    pageHeader: {
      buttons: {
        create: 'Tạo mới',
        all: 'Danh sách công việc',
      },
    },
    jobStatus: {
      title: 'Tình trạng công việc',
      label: {
        status: 'Tình trạng',
        employee: 'Thợ ảnh',
        leader: 'Leader',
      },
    },
    jobMoney: {
      title: 'Chi phí',
      label: {
        paid: 'Đã thanh toán',
        debt: 'Còn nợ',
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
  '/workflow' : {
    title: 'Bảng điều phối công việc'
  }
};
