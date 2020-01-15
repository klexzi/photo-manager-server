const photo = (sequelize, DataTypes) => {
  const Photo = sequelize.define('photo', {
    caption: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM(
        'Profile',
        'Home',
        'Planning',
        'Social',
        'Backup'
      ),
    },
  });

  return Photo;
};

export default photo;
