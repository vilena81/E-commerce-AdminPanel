'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    
    static associate(models) {
    Image.belongsTo(models.Product, {foreignKey:'ProductId',key:'id'})
    }
  }
  Image.init({
    ProductId: DataTypes.INTEGER,
    fileName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};