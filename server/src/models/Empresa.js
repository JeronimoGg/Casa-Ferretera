const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../db');

const Empresa = sequelize.define('Empresa', {
        id_empresa: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    },{
        tableName: 'empresa',
        timestamps: false
    });

module.exports = Empresa;
