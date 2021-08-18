import RoleType from '~/models/RoleType';

const managementJobAuthConfig = {
  PaymentButton: {
    roles: [RoleType.SysAdmin],
  },
  DeleteButton: {
    roles: [RoleType.SysAdmin, RoleType.HelpDesk],
  },
};

export default managementJobAuthConfig;
