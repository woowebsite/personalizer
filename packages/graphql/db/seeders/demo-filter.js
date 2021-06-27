'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('filters', [
      {
        title: 'Nhân viên',
        conditions: '{"role_id":4}',
        model_name: 'User',
        status: 'A',
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Khách hàng',
        conditions: '{"role_id":5}',
        model_name: 'User',
        status: 'A',
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Thông thường',
        conditions: '{"metadata":{"key":"customerType", "value":"2"}}',
        model_name: 'Customer',
        status: 'A',
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'VIP',
        conditions: '{"metadata":{"key":"customerType", "value":"1"}}',
        model_name: 'Customer',
        status: 'A',
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Chưa thực hiện',
        conditions: '{"job": {"status": "A"}, "taxonomies":[13]}',    // 13 is term_taxonomy id, with 'New' status
        model_name: 'Job',
        status: 'A',
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Hoàn thành',
        conditions: '{"job": {"status": "A"}, "taxonomies":[8]}',    // 13 is term_taxonomy id, with 'New' status
        model_name: 'Job',
        status: 'A',
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('filters', null, {});
  },
};
