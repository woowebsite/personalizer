export const cookieToObj = (cookie) => {
  if (!cookie) return;
  const strs = cookie.split(';');
  const cookieObj = {};
  strs.forEach((str) => {
    const key = str.split('=')[0].trim();
    const value = str.split('=')[1].trim();
    cookieObj[key] = value;
  });
  return cookieObj;
};
