/**
 * Convert Antd form.getFieldValues into Request Metadata to put into Graphql mutation
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
 * Convert Response Metadata to put into fields of an object Graphql 
 * @param metadata Array metadata 
 * @param obj   Result use to attack fields into
 * Term{name: Nghiem}
 * [{
      "__typename": "TermMeta",
      "id": 7,
      "key": "phone",
      "type": "number",
      "value": "099493434",
    }]
    => Term {name: Nghiem, phone: 099493434}
 */
export const metadata2Fields = (metadata: any[], initialObj: any = {}) => {
  if (!metadata) return;
  const result = metadata.reduce(
    (obj, meta) => ({
      ...obj,
      [meta.key]: meta.value,
    }),
    initialObj,
  );
  return result;
};

/**
 * Convert Antd form.getFieldValues into Taxonomies to put into Graphql mutation
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
