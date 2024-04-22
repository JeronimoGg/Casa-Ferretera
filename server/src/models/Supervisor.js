const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../db');
const Sede = require('./Sede');

const Supervisor = sequelize.define('Supervisor',{
        id_supervisor: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_sede: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Sede,
                key: 'id_sede'
            }
        },
        correo: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        contrasena: {
            type: DataTypes.STRING(80),
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING(80),
            allowNull: false
        }
    },{
        tableName: 'supervisor',
        timestamps: false
    });

module.exports = Supervisor;