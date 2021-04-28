/**
 * Convert Form values into Metadata to put into Graphql mutation
 * @param fields Object fields: example {address: 'abc', phone: '1234'}
 */
export const fieldsToMetadata = (fields: object) => {
  if (!fields) return;
  let result = [];
  for (const prop in fields) {
    let value =
      typeof fields[prop] === 'object'
        ? JSON.stringify(fields[prop])
        : fields[prop].toString();

    result.push({ key: prop, value, type: typeof fields[prop] });
  }
  return result;
};
