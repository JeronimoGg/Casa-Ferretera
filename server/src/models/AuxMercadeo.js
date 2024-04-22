const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../db');

const AuxMercadeo = sequelize.define('AuxMercadeo',{
        id_auxmercado: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        correo: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        contrasena: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    }, {
        tableName: 'auxmercadeo',
        timestamps: false
    });

module.exports = AuxMercadeo;