'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      roleId: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      email: "wooowebsite@gmail.com",
      email_verified: Date.now(),
      name: "Nghiem Tran",
      password: "$2b$10$QRdi.FleYan/H/X5aSnhrupIYJ0EpjtYQAg84EA7SyzgXMbtu8DFO"   //1
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
