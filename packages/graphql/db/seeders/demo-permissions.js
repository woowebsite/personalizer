'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('permissions', [
      {
        featureName: 'User',
        type: 'groups',
        refId: 1,
        code: 1,
        status: 'A',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        featureName: 'Authorized',
        type: 'groups',
        refId: 1,
        code: 1,
        status: 'A',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        featureName: 'Customer',
        type: 'groups',
        refId: 1,
        code: 1,
        status: 'A',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        featureName: 'Job',
        type: 'groups',
        refId: 1,
        code: 1,
        status: 'A',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        featureName: 'Settings',
        type: 'groups',
        refId: 1,
        code: 1,
        status: 'A',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('roles', null, {});
  },
};
