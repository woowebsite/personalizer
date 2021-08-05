import RoleType from '../constants/RoleType';

export const whereCurrentUser = (ctx, where) => {
  const metadata = where.metadata || [];
  const { currentUser } = ctx;
  switch (currentUser.role_id) {
    case RoleType.SysAdmin:
      break;
    case RoleType.HelpDesk:
      break;
    case RoleType.Customer:
      where.job = {
        ...where.job,
        userId: currentUser.id,
      };
      break;
    case RoleType.Employee:
      where.metadata = [
        ...metadata,
        {
          key: 'employee',
          value: currentUser.id,
        },
      ];
      break;
    case RoleType.Leader:
      where.metadata = [
        ...metadata,
        {
          key: 'leader',
          value: currentUser.id,
        },
      ];
      break;
  }
  return where;
};
