'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Admins',
      [
        {
          name: 'Kennedy Chin',
          email: 'kennedy@chin.com',
          password: 'kennedy123',
          venueId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Amanda Rambo',
          email: 'amanda@rambo.com',
          password: 'amanda123',
          venueId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Admins', null, {});
  },
};
