import RoleType from '~/models/RoleType';
import StatusType from '~/models/StatusType';

export const defaultFilter = {
  status: StatusType.Actived,
  role_id: RoleType.Customer,
};
