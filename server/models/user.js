'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
  
    static associate(models) {
      User.hasMany(models.Token, {
        foreignKey: "userId",
        onDelete: "cascade",
        onUpdate: "cascade",
      })
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    isActivated: DataTypes.BOOLEAN,
    activationLink: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};