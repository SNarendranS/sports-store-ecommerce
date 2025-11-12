import { DataTypes } from 'sequelize';
import { sequelize } from '../utils/database.js';

const Product = sequelize.define('Product', {
  productid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  des: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0, 
    },
  },
  discount: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 0, 
    },
  },
  availableStock: {
    type: DataTypes.INTEGER,
    defaultValue: 15,
    validate: {
      min: 0, 
    },
  },
}, {
  tableName: 'products',   
  timestamps: true,       
});

export default Product;