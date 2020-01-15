'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define(
    'Photo',
    {
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      caption: {
        type: DataTypes.STRING,
      },
      category: DataTypes.ENUM(
        'Profile',
        'Home',
        'Planning',
        'Social',
        'Backup'
      ),
    },
    {}
  );
  Photo.associate = function(models) {
    Photo.belongsTo(models.Venue);
  };
  return Photo;
};
