'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Token.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "cascade",
        onUpdate: "cascade",
      })
    }
  }
  Token.init({
    userId: DataTypes.INTEGER,
    refreshToken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Token',
  });
  return Token;
};