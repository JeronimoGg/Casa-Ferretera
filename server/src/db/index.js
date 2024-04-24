const { Sequelize } = require('sequelize');
const { DB_HOST, DB_NAME, DB_USER } = require('../config');

const sequelize = new Sequelize(DB_NAME, DB_USER, '', {
    host: DB_HOST || 'localhost',
    dialect: 'mysql',
  });



module.exports = sequelize;