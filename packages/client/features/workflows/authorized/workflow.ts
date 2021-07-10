import RoleType from '~/models/RoleType';

const workflowAuthConfig = {
  FilterForm: {
    roles: [RoleType.SysAdmin],
  },
  CardDraggable: {
    roles: [RoleType.Employee, RoleType.SysAdmin, RoleType.Leader],
  },
  JobDrawer: {
    roles: [RoleType.Employee, RoleType.SysAdmin, RoleType.Leader],
  },
};

export default workflowAuthConfig;
