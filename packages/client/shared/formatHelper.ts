export const formatMoney = money => {
  return parseFloat(money).toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
};
