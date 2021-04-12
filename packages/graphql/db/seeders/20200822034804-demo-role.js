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
        name: 'HelpDesk',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        id: 3,
        name: 'Leader',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        id: 4,
        name: 'Employee',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        id: 5,
        name: 'Customer',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('roles', null, {});
  },
};
