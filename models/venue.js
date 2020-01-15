'use strict';
module.exports = (sequelize, DataTypes) => {
  const Venue = sequelize.define(
    'Venue',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  Venue.associate = function(models) {
    Venue.hasMany(models.Admin);
    Venue.hasMany(models.Photo);
  };
  return Venue;
};
