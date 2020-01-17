'use strict';
import bcrypt from 'bcryptjs';

module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    'Admin',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  Admin.associate = function(models) {
    Admin.belongsTo(models.Venue);
  };

  Admin.findByEmail = async email => {
    let admin = await Admin.findOne({
      where: { email },
    });

    if (!admin) {
      admin = await Admin.findOne({
        where: { email },
      });
    }

    return admin;
  };
  Admin.beforeBulkCreate(async admins => {
    admins = admins.map(async admin => {
      admin.password = await admin.generatePasswordHash();
    });
  });
  Admin.beforeCreate(async admin => {
    admin.password = await admin.generatePasswordHash();
  });

  Admin.prototype.generatePasswordHash = async function() {
    const saltRounds = 10;
    return await bcrypt.hash(this.password, saltRounds);
  };

  Admin.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };
  return Admin;
};
