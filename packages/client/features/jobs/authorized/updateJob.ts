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
};

export default updateJobAuthConfig;
