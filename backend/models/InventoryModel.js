
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Inventory = sequelize.define('Inventory', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

module.exports = Inventory;
