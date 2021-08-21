import RoleType from '~/models/RoleType';

const updateJobAuthConfig = {
  JobStatusBox: {
    roles: [RoleType.SysAdmin],
  },
  JobForm: {
    roles: [RoleType.SysAdmin],
  },
  JobAssignee: {
    roles: [RoleType.SysAdmin],
  },
  ButtonGroup: {
    roles: [RoleType.SysAdmin, RoleType.HelpDesk, RoleType.Customer],
  },
};

export default updateJobAuthConfig;
