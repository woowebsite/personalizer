/**
 * Convert Form values into Metadata to put into Graphql mutation
 * @param fields Object fields: example {address: 'abc', phone: '1234'}
 */
export const fieldsToMetadata = (fields: object) => {
  if (!fields) return;
  let result = [];
  for (const prop in fields) {
    let value;

    if (typeof fields[prop] === 'object') value = JSON.stringify(fields[prop]);
    else if (typeof fields[prop] === 'number') value = parseFloat(fields[prop]);
    else value = fields[prop].toString();

    result.push({ key: prop, value, type: typeof fields[prop] });
  }
  return result;
};

/**
 * Convert Form values into Metadata to put into Graphql mutation
 * @param fields Object fields: example {address: 'abc', phone: '1234'}
 */
export const fieldsToTaxonomies = (fields: object) => {
  if (!fields) return;
  let result = [];
  for (const prop in fields) {
    let value;

    if (typeof fields[prop] === 'object') value = JSON.stringify(fields[prop]);
    else if (typeof fields[prop] === 'number') value = parseFloat(fields[prop]);
    else value = fields[prop].toString();

    result.push({ key: prop, value, type: typeof fields[prop] });
  }
  return result;
};
