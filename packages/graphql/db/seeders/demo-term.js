'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Terms', [
      // categories
      {
        name: 'T shirt',
        slug: 't-shirt',
      },
      {
        name: 'Fashion',
        slug: 'fashion',
      },
      {
        name: 'Jewelry',
        slug: 'jewelry',
      },
      {
        name: 'Books',
        slug: 'books',
      },

      //tags
      {
        name: 'man',
        slug: 'man',
      },
      {
        name: 'woman',
        slug: 'woman',
      },
    ]);

    const terms = await queryInterface.sequelize.query(`SELECT id from Terms;`);
    return await queryInterface.bulkInsert(
      'TermTaxonomies',
      [
        // categories
        {
          taxonomy: 'productbase_category',
          description: '...',
          slug: 'productbase_category',
          order: 1,
          count: 1,
          term_id: terms[0][0].id,
        },
        {
          taxonomy: 'productbase_category',
          description: '...',
          slug: 'productbase_category',
          order: 1,
          count: 1,
          term_id: terms[0][1].id,
        },
        {
          taxonomy: 'productbase_category',
          description: '...',
          slug: 'productbase_category',
          order: 1,
          count: 1,
          term_id: terms[0][2].id,
        },
        {
          taxonomy: 'productbase_category',
          description: '...',
          slug: 'productbase_category',
          order: 1,
          count: 1,
          term_id: terms[0][3].id,
        },

        //tags
        {
          taxonomy: 'productbase_tag',
          description: '...',
          slug: 'productbase_tag',
          order: 1,
          count: 1,
          term_id: terms[0][4].id,
        },
        {
          taxonomy: 'productbase_tag',
          description: '...',
          slug: 'productbase_tag',
          order: 1,
          count: 1,
          term_id: terms[0][5].id,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('terms', null, {});
    await queryInterface.bulkDelete('termsTaxonomies', null, {});
  },
};
