export const enumToDitionary = (type): any[] => {
  const dataSource = Object.values<string>(type)
    .filter(e => typeof e === 'string')
    .map(key => ({
      id: type[key],
      name: key,
    }));
  return dataSource;
};

/**
 *
 * @param type an enum
 * @returns array of values
 * Example
 * enum2ArrayValues(UserStatus) => [ A, D ]
 */
export const enum2ArrayValues = (type): string[] => {
  const dataSource = Object.values<string>(type);
  return dataSource;
};
