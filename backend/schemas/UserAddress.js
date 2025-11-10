const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');
const User = require('./User'); // Ensure this model exists and exports correctly

const UserAddress = sequelize.define('UserAddress', {
  addressid: {
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
  tag: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  addressLine1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  addressLine2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  addressLine3: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pincode: {
    type: DataTypes.STRING(6),
    allowNull: false,
    validate: {
      len: [6, 6],
    },
  },
}, {
  tableName: 'userAddress',
  timestamps: true,
});

// Define associations
User.hasMany(UserAddress, { foreignKey: 'userid', onDelete: 'CASCADE' });
UserAddress.belongsTo(User, { foreignKey: 'userid' });

module.exports = UserAddress;
