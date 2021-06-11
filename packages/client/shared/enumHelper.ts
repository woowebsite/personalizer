export const enumToDitionary = (type): any[] => {
  if (typeof type !== 'object') throw new Error(`${type} is not enum`);

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
 * @param value a value of option
 * @returns option
 * Example
 * getEnumOptionByValue(UserStatus, A) => { Actived: A }
 */
export const getEnumOptionByValue = (type, value) => {
  const option = Object.entries(type).find(x => x[1] === value);
  return {
    name: option[0],
    id: option[1],
  };
};

export const enumToTranslate = (type, enumName, value, t) => {
  const label = type[value];
  return t(`enum.${enumName}.${label}`);
};
