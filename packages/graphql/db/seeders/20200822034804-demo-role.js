'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('roles', [
      {
        id: 1,
        name: 'System Admin',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        id: 2,
        name: 'Admin',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        id: 3,
        name: 'Moderator',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('roles', null, {});
  },
};
