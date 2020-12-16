'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('companies', [{
      id: 1,
      name: 'FPT',
      createdAt: Date.now(),
      updatedAt: Date.now()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('companies', null, {});
  }
};
