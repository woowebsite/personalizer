import RoleType from '~/models/RoleType';
import StatusType from '~/models/StatusType';

export const defaultFilter = {
  status: StatusType.Actived,
  refId: RoleType.SysAdmin,
};

export enum PermissionActions {
  Read = 1,
  Create = 2,
  Update = 4,
  Delete = 8,
}

export const PermissionFullAccessCode = 15;
