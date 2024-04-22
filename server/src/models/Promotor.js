const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../db');
const Proveedor = require('./Proveedor');

const Promotor = sequelize.define('Promotor',{
        id_promotor: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_proveedor: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Proveedor,
                key: 'id_proveedor'
            }
        },
        correo: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        contrasena: {
            type: DataTypes.STRING(100),
            allowNull: false
        }, 
        calificacion: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        documentos: {
            type: DataTypes.STRING(100),
            allowNull: true
        }

    },{
        tableName: 'promotor',
        timestamps: false
    })

module.exports = Promotor;