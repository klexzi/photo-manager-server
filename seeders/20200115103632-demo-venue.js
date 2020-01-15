'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Venues',
      [
        {
          name: 'St Anthony',
          location: 'Los Angeles',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Chariot',
          location: 'New York',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Venues', null, {});
  },
};
