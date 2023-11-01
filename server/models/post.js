'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init({
    creator: DataTypes.STRING,
    title: DataTypes.STRING,
    link: DataTypes.STRING,
    pubDate: DataTypes.STRING,
    contentEncoded: DataTypes.TEXT,
    contentEncodedSnippet: DataTypes.TEXT,
    guid: DataTypes.STRING,
    categories: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};