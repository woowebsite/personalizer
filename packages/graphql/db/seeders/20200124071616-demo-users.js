'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        role_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
        email: 'wooowebsite@gmail.com',
        email_verified: new Date(),
        name: 'Nghiem Tran',
        status: 'A',
        password:
          '$2b$10$QRdi.FleYan/H/X5aSnhrupIYJ0EpjtYQAg84EA7SyzgXMbtu8DFO', //1
      },
      {
        role_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
        email: 'quanretoucher@gmail.com',
        email_verified: new Date(),
        name: 'Quan',
        status: 'A',
        password:
          '$2b$10$QRdi.FleYan/H/X5aSnhrupIYJ0EpjtYQAg84EA7SyzgXMbtu8DFO', //1
      },
      {
        role_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
        email: 'chieudong4712@gmail.com',
        email_verified: new Date(),
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
