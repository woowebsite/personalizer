'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('terms', [
      {
        name: 'Urgent',
        slug: 'urgent',
      },
      {
        name: 'High',
        slug: 'high',
      },
      {
        name: 'Normal',
        slug: 'normal',
      },
      {
        name: 'Low',
        slug: 'low',
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
