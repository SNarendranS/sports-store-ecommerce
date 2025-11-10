const { DataTypes } = require('sequelize');
const {sequelize} = require('../utils/database');
const User = require('./User');
const Product = require('./Product');
const Cart = sequelize.define('Cart', {
  cartid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'userid', // assumes your user model primary key is userid
    },
    onDelete: 'CASCADE',
  },
  productid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'productid', // assumes Product model uses "id" as primary key
    },
    onDelete: 'CASCADE',
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
}, {
  tableName: 'carts',
  timestamps: true,
});

module.exports = Cart;
