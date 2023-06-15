'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PopularProduct extends Model {
    
    static associate(models) {
      
    }
  }
  PopularProduct.init({
    name: DataTypes.STRING,
    img: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PopularProduct',
  });
  return PopularProduct;
};