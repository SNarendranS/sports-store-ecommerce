import { DataTypes } from 'sequelize';
import {sequelize} from '../utils/database.js';
import User from './User.js';
import Product from './Product.js';
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

export default Cart;
