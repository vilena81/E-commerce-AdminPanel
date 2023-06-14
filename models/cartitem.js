'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
   
    static associate(models) {
      CartItem.belongsTo(models.Product, {foreignKey:'productId', key:'id'})
      CartItem.belongsTo(models.Cart, {foreignKey:'carttId', key:'id'})

      
    }
  }
  CartItem.init({
    ProductId: DataTypes.INTEGER,
    CartId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CartItem',
  });
  return CartItem;
};