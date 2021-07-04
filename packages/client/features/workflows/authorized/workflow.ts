import RoleType from '~/models/RoleType';

const workflowAuthConfig = {
  FilterForm: {
    roles: [RoleType.SysAdmin],
  },
  CardDraggable: {
    roles: [RoleType.SysAdmin],
  },
};

export default workflowAuthConfig;
