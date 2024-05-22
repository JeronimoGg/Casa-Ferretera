const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');
const Promotor = require('./Promotor');
const Supervisor = require('./Supervisor');

const Calificacion = sequelize.define('Calificacion',{
    id_calificacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_promotor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Promotor,
            key: 'id_promotor'
        }
    },
    id_supervisor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Supervisor,
            key: 'id_supervisor'
        }
    },
    calificacion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    comentario: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    tableName: 'calificacion',
    timestamps: false
})

module.exports = Calificacion;