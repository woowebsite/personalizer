'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      companyId: 1,
      createAt: Date.now(),
      updateAt: Date.now(),
      email: "admin@personalizer.com",
      email_verified: Date.now(),
      name: "Nghiem Tran",
      password: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk1MDkwMDY0LCJleHAiOjE2MjY2NDc2NjR9.mAqh-moD4TkyRYZSoQA8fXa6cFev4Oo28W-EBWGYGD0"   //1
    }, {
      slug: 'deactive',
      name: 'Deactive'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
