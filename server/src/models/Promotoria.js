const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../db');
const Promotor = require('./Promotor');
const Proveedor = require('./Proveedor');
const Sede = require('./Sede');
const Estado = require('./Estado');

const Promotoria = sequelize.define('Promotoria',{
        id_promotoria: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_promotor: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Promotor,
                key: 'id_promotor'
            }
        },
        id_proveedor: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Proveedor,
                key: 'id_proveedor'
            }
        },
        id_sede: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Sede,
                key: 'id_sede'
            }
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false
        },
        horaInicio: {
            type: DataTypes.TIME,
            allowNull: false
        },
        horaFinal: {
            type: DataTypes.TIME,
            allowNull: false
        },
        id_estado: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Estado,
                key: 'id_estado'
            }
        },
        registroFotos: {
            type: DataTypes.STRING(300),
            allowNull: false
        }
    },{
        tableName: 'promotoria',
        timestamps: false
    })

module.exports = Promotoria;