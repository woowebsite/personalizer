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
