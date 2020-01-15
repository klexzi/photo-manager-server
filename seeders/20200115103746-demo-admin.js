'use strict';
const bcrypt = require('bcryptjs');
const hashPassword = password => {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Admins',
      [
        {
          name: 'Kennedy Chin',
          email: 'kennedy@chin.com',
          password: hashPassword('kennedy123'),
          VenueId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Amanda Rambo',
          email: 'amanda@rambo.com',
          password: hashPassword('amanda123'),
          VenueId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {
        validate: true,
        individualHooks: true,
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Admins', null, {});
  },
};
