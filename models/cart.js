'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
   
    static associate(models) {
     
      Cart.belongsTo(models.User, {foreignKey:'userId',key:'id'});
      Cart.belongsToMany(models.Product,{through:models.CartItem});
      Cart.hasMany(models.CartItem);
      
    }
  }
  Cart.init({
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};