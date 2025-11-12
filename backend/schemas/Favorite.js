import { DataTypes } from 'sequelize';
import { sequelize } from '../utils/database.js';
import User from './User.js';
import Product from './Product.js';
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

export default Favorite;
