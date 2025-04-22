// src/server/db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('elitesport', '', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
