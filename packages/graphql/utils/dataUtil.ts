/**
 * Convert metadata array into fields of object
 * Example: from {user: {name, password, sex, userMeta: [{key: 'phone', value: '1234'}, {key: 'address', value: '123 Street ABC'}]}}
 * Into {user: {name, password, sex, phone: '1234', address: '123 Street ABC' }
 * @param data object with metadata
 * @param metadata name of metadata field, eg: userMeta
 */
export const metadataToField = (obj, metadata = 'metadata') => {
  if (!obj || !metadata) {
    console.error('MetadataToField Error: Object or metadata is null');
    return;
  }
  if (!obj.hasOwnProperty(metadata)) {
    console.error(
      `MetadataToField Error: ${metadata} is not exists in object`,
      obj,
    );
    return;
  }

  const meta = obj.dataValues[metadata];
  if (meta && meta.length > 0) {
    meta.forEach(x => {
      let { value, data, type } = x.dataValues;
      // parse data by 'type'
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
      obj.setDataValue(x.dataValues.key, value);
    });
  }
  return obj;
};

/**
 * Convert metadata array into fields of object
 * Example: from {user: {name, password, sex, jobTerms: [{key: 'phone', value: '1234'}, {key: 'address', value: '123 Street ABC'}]}}
 * Into {user: {name, password, sex, phone: '1234', address: '123 Street ABC' }
 * @param data object with metadata
 * @param termField name of term field, eg: jobTerms
 */
export const taxonomyToField = (obj, termField) => {
  if (!obj || !termField) {
    console.error(`TermsToField Error: Object or termField is null`);
    return;
  }
  if (!obj.hasOwnProperty(termField)) {
    console.error(
      `TermsToField Error: ${termField} is not exists in object`,
      obj,
    );
    return;
  }

  const term = obj.dataValues[termField];
  if (term && term.length > 0) {
    term.forEach(x => {
      const termTaxonomy = x.dataValues.termTaxonomy;
      const { taxonomy, id, term } = termTaxonomy.dataValues;
      const { name } = term.dataValues;
      return obj.setDataValue(taxonomy, { name, value: id });
    });
  }
  return obj;
};
