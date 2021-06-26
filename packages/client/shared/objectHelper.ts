export const isEmpty = obj => {
  if (!obj) return true;
  return Object.values(obj).every(o => o === null || o === undefined);
};
