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
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('terms', null, {});
  },
};
