'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('terms', [
      {
        name: 'Ưu tiên',
        slug: 'uu-tien',
      },
      {
        name: 'Cao',
        slug: 'cao',
      },
      {
        name: 'Thông thường',
        slug: 'thong-thuong',
      },
      {
        name: 'Thấp',
        slug: 'thap',
      },
      {
        name: 'Mới tạo',
        slug: 'moi-tao',
      },
      {
        name: 'Todo',
        slug: 'todo',
      },
      {
        name: 'Blend Màu',
        slug: 'blend-color',
      },
      {
        name: 'Chấm sửa',
        slug: 'cham-sua',
      },
      {
        name: 'Hoàn thiện',
        slug: 'hoan-thien',
      },
      {
        name: 'Nạp tiền',
        slug: 'nap-tien',
      },
      {
        name: 'Rút tiền',
        slug: 'rut-tien',
      },
      {
        name: 'Nhận tiền',
        slug: 'nhan-tien',
      },
      {
        name: 'Tạm giữ',
        slug: 'tam-giu',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('terms', null, {});
  },
};
