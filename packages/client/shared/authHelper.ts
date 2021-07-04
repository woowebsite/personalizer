export const hasPermission = (config, session) => {
  const { user } = session;
  const visible = config.roles.includes(user.role_id);
  return visible;
};
