// src/server/db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('elitesport', 'root', 'qwerty123', {
  host: 'elitesport-db.cvkmsuky6hmr.us-east-1.rds.amazonaws.com',
  dialect: 'mysql',
});

module.exports = sequelize;
