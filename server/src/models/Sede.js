const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../db');

const Sede = sequelize.define('Sede',{
        id_sede: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    },{
        tableName: 'sede',
        timestamps: false
    });

module.exports = Sede;