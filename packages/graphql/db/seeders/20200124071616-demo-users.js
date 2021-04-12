'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        role_id: 1,
        created_at: Date.now(),
        updated_at: Date.now(),
        email: 'wooowebsite@gmail.com',
        email_verified: Date.now(),
        name: 'Nghiem Tran',
        status: 'A',
        password:
          '$2b$10$QRdi.FleYan/H/X5aSnhrupIYJ0EpjtYQAg84EA7SyzgXMbtu8DFO', //1
      },
      {
        role_id: 2,
        created_at: Date.now(),
        updated_at: Date.now(),
        email: 'quanretoucher@gmail.com',
        email_verified: Date.now(),
        name: 'Quan',
        status: 'A',
        password:
          '$2b$10$QRdi.FleYan/H/X5aSnhrupIYJ0EpjtYQAg84EA7SyzgXMbtu8DFO', //1
      },
      {
        role_id: 3,
        created_at: Date.now(),
        updated_at: Date.now(),
        email: 'chieudong4712@gmail.com',
        email_verified: Date.now(),
        name: 'Minh Phuong',
        status: 'A',
        password:
          '$2b$10$QRdi.FleYan/H/X5aSnhrupIYJ0EpjtYQAg84EA7SyzgXMbtu8DFO', //1
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
