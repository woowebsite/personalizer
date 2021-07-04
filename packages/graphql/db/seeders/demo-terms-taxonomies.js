'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('termtaxonomies', [
      {
        taxonomy: 'job_priority',
        slug: 'job_priority',
        term_id: 1,
      },
      {
        taxonomy: 'job_priority',
        slug: 'job_priority',
        term_id: 2,
      },
      {
        taxonomy: 'job_priority',
        slug: 'job_priority',
        term_id: 3,
      },
      {
        taxonomy: 'job_priority',
        slug: 'job_priority',
        term_id: 4,
      },
      {
        taxonomy: 'job_status',
        slug: 'job_status',
        term_id: 5,
      },
      {
        taxonomy: 'job_status',
        slug: 'job_status',
        term_id: 6,
      },
      {
        taxonomy: 'job_status',
        slug: 'job_status',
        term_id: 7,
      },
      {
        taxonomy: 'job_status',
        slug: 'job_status',
        term_id: 8,
      },
      {
        taxonomy: 'job_status',
        slug: 'job_status',
        term_id: 9,
      },
      {
        taxonomy: 'account_deposit',
        slug: 'account_deposit',
        term_id: 10,
      },
      {
        taxonomy: 'account_withdraw',
        slug: 'account_withdraw',
        term_id: 11,
      },
      {
        taxonomy: 'account_earning',
        slug: 'account_earning',
        term_id: 12,
      },
      {
        taxonomy: 'account_holding',
        slug: 'account_holding',
        term_id: 13,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('roles', null, {});
  },
};
