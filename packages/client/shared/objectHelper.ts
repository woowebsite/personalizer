export const isEmpty = obj => {
  return Object.values(obj).every(o => o === null || o === undefined);
};
