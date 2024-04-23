const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../db');

const Estado = sequelize.define('Estado',{
        id_estado: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    },{
        tableName: 'estado',
        timestamps: false
    });

module.exports = Estado;