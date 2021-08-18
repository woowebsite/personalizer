import RoleType from '~/models/RoleType';

const managementJobAuthConfig = {
  PaymentButton: {
    roles: [RoleType.SysAdmin],
  },
  DeleteButton: {
    roles: [RoleType.Customer],
  },
};

export default managementJobAuthConfig;
