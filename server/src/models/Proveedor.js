const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../db');
const Empresa = require('./Empresa');

const Proveedor = sequelize.define('Proveedor',{
        id_proveedor: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
        },
        id_empresa: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Empresa,
                key: 'id_empresa'
            }
        }

    },{
        tableName: 'proveedor',
        timestamps: false
    });

module.exports = Proveedor;