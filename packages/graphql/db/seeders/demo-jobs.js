'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('jobs', [
      {
        title: 'Ảnh cưới Hùng & Phương',
        description: 'Blend màu Hàn Quốc trong sáng',
        status: 'A',
        dueDate: new Date(),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('roles', null, {});
  },
};
