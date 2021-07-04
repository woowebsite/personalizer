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

export const enumToObject = (type, reverse: boolean = false) => {
  if (typeof type !== 'object') throw new Error(`${type} is not enum`);
  const dataSource = Object.entries(type).reduce((obj, option) => {
    const item: any = reverse
      ? { [option[1].toString()]: option[0] }
      : { [option[0].toString()]: option[1] };

    return {
      ...obj,
      ...item,
    };
  }, {});

  return dataSource;
};

export const enumToTranslate = (type, enumName, value, t) => {
  const e = enumToObject(type, true);
  const label = e[value];
  return t(`enum.${enumName}.${label}`);
};
