import RoleType from '../constants/RoleType';

export const whereCurrentUser = (ctx, where) => {
  const { currentUser } = ctx;
  switch (currentUser.role_id) {
    case RoleType.SysAdmin:
      break;
    case RoleType.HelpDesk:
      break;
    case RoleType.Customer:
      where.job.userId = currentUser.id;
      break;
    case RoleType.Employee:
      where.metadata = [
        ...where.metadata,
        {
          key: 'employee',
          value: currentUser.id,
        },
      ];
      break;
    case RoleType.Leader:
      where.metadata = [
        ...where.metadata,
        {
          key: 'leader',
          value: currentUser.id,
        },
      ];
      break;
  }
  return where;
};
