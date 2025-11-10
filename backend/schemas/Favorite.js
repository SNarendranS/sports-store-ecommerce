const { DataTypes } = require('sequelize');
const {sequelize} = require('../utils/database');
const User = require('./User');
const Product = require('./Product');
const Favorite = sequelize.define('Favorite', {
  favoriteid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'userid',
    },
    onDelete: 'CASCADE',
  },
  productid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'productid',
    },
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'favorites',
  timestamps: true,
});

module.exports = Favorite;
