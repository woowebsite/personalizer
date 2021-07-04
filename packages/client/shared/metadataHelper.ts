import { isEmpty } from 'lodash';

/**
 * Convert Form values into Metadata to put into Graphql mutation
 * @param fields Object fields: example {address: 'abc', phone: '1234'}
 */
export const fieldsToMetadata = (fields: object) => {
  if (!fields) return;
  let result = [];
  for (const prop in fields) {
    if (isEmpty(fields[prop])) continue; //skip
    let data;
    let value;
    if (typeof fields[prop] === 'object') {
      if (!fields[prop].value) console.log('field error: ', fields[prop]);
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
 * Convert Form values into Taxonomies to put into Graphql mutation
 * @param fields Object fields: example [{name: 'abc', value: '1234'}]
 */
export const fieldsToTaxonomies = (fields: Array<any>) => {
  if (!fields) return;
  console.log('fieldsToTaxonomies fields: ', fields);
  let result = [];
  for (const prop in fields) {
    result.push(fields[prop].value);
  }
  console.log('fieldsToTaxonomies result: ', result);
  return result;
};
