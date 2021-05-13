/**
 * Convert Form values into Metadata to put into Graphql mutation
 * @param fields Object fields: example {address: 'abc', phone: '1234'}
 */
 export const fieldsToMetadata = (fields: object) => {
  if (!fields) return;
  let result = [];
  for (const prop in fields) {
    let data;
    let value;
    if (typeof fields[prop] === 'object') {
      data = JSON.stringify(fields[prop]); // fields[prop]: {value: 1, label: "abc"}
      value = fields[prop].value.toString();
    } else if (typeof fields[prop] !== 'undefined')
      value = data = fields[prop].toString();

    if (data) {
      result.push({
        key: prop,
        value,
        type: typeof fields[prop],
        data,
      });
    }
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
