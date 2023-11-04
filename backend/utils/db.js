const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('inventorydb', 'root', 'tiger', {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log,
});

module.exports = sequelize;
