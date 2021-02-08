/**
 * this function use to flatten the object nested in language json file
 * @param nestedMessages
 * @param prefix
 * @returns {{}}
 */
export function flattenMessages(nestedMessages, prefix = '') {
  return Object.keys(nestedMessages).reduce((messages, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;
    const cloneMessage = { ...messages };

    if (typeof value === 'string') {
      cloneMessage[prefixedKey] = value;
    } else {
      Object.assign(cloneMessage, flattenMessages(value, prefixedKey));
    }

    return cloneMessage;
  }, {});
}

/**
 * Combine common and locale by pathname
 */
export default function messages(locale, locales, pathname) {
  const localePage = locales[locale];
  const messagesPage = localePage[pathname];
  const messagesCommon = flattenMessages(localePage['common']);
  const messages = { ...messagesPage, ...messagesCommon };

  return messages;
}
