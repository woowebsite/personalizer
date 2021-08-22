import RoleType from '~/models/RoleType';

const managementJobAuthConfig = {
  DeleteButton: {
    roles: [RoleType.SysAdmin, RoleType.HelpDesk],
  },
};

export default managementJobAuthConfig;
