const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('casa_ferretera', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
  });



module.exports = sequelize;