export const enumToDitionary = (type): any[] => {
  const dataSource = Object.values<string>(type)
    .filter(e => typeof e === 'string')
    .map(key => ({
      id: type[key],
      name: key,
    }));
  return dataSource;
};

export const getEnumLabel = (type, id) => {
  const dataSource = Object.values<string>(type)
    .filter(e => typeof e === 'string')
    .map(key => ({
      id: type[key],
      name: key,
    }));
  return dataSource.find(x => x.id === id).name;
};
