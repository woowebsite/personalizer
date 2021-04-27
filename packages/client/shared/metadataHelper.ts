/**
 * Convert Form values into Metadata to put into Graphql mutation
 * @param fields Object fields: example {address: 'abc', phone: '1234'}
 */
export const fieldsToMetadata = (fields: object) => {
  if (!fields) return;
  let result = [];
  for (const prop in fields) {
    result.push({ key: prop, value: fields[prop].toString() });
  }
  return result;
};
