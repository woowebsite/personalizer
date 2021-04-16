/**
 * Convert metadata array into fields of object
 * Example: from {user: {name, password, sex, userMeta: [{key: 'phone', value: '1234'}, {key: 'address', value: '123 Street ABC'}]}}
 * Into {user: {name, password, sex, phone: '1234', address: '123 Street ABC' }
 * @param data object with metadata
 * @param metadata name of metadata field, eg: userMeta
 */
export const metadataToField = (obj, metadata) => {
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
    meta.forEach(x => obj.setDataValue(x.dataValues.key, x.dataValues.value));
  }
  return obj;
};