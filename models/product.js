'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    
    static associate(models) {
      Product.belongsTo(models.Category, {foreignKey:"CategoryId"}) 
      Product.hasMany(models.Image, {foreignKey:'productId'});
      Product.belongsToMany(models.Cart, { through: models.CartItem });
      Product.hasMany(models.CartItem);
      
    }
  }
  Product.init({
    name: DataTypes.STRING,
    img: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    quantity:DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};