import RoleType from '../constants/RoleType';

export const whereCurrentUser = (ctx, where) => {
  const { currentUser } = ctx;
  if (currentUser.role_id !== RoleType.SysAdmin) {
    where.userId = currentUser.id;
  }
  return where;
};
