import RoleType from '~/models/RoleType';

const managementJobAuthConfig = {
  PaymentButton: {
    roles: [RoleType.SysAdmin],
  },
};

export default managementJobAuthConfig;
