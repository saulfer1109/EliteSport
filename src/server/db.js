// src/server/db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('hype_store', '', '', {
  host: 'localhost',  // O la URL de tu base de datos
  dialect: 'mysql',   // Cambia a 'postgres' si usas PostgreSQL
});

module.exports = sequelize;
