import { isNull } from 'lodash';

/**
 * Convert Form values into Metadata to put into Graphql mutation
 * @param fields Object fields: example {address: 'abc', phone: '1234'}
 */
export const fieldsToMetadata = (fields: object) => {
  if (!fields) return;
  let result = [];
  for (const prop in fields) {
    if (isNull(fields[prop])) continue; //skip
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
 * Convert metadata array into fields of object
 * Example: from {user: {name, password, sex, userMeta: [{key: 'phone', value: '1234'}, {key: 'address', value: '123 Street ABC'}]}}
 * Into {user: {name, password, sex, phone: '1234', address: '123 Street ABC' }
 * @param metadata name of metadata field, eg: userMeta
 */
export const metadataToField = (meta: Array<any>) => {
  let obj = {};
  if (meta && meta.length > 0) {
    meta.forEach(x => {
      let { value, data, type } = x;
      if (type === 'boolean') value = !!JSON.parse(value);
      if (type === 'number') value = parseFloat(value);
      if (type === 'object') {
        const m = JSON.parse(data);
        value = {
          name: m.name,
          value: m.value,
        };
      }

      // setValue
      obj[x.key] = value;
    });
  }
  return obj;
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
