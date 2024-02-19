import { DataTypes } from 'sequelize';
import {sequelize} from '../config/database.js';

export const Consultorio = sequelize.define('Consultorio', {
    pkConsultorio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    salas: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true
    },
    uf: {
        type: DataTypes.STRING(2),
        allowNull: false
    },
    cidade: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    bairro: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    rua: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    endereco: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    logradouro: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    horarios: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    complemento: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    referencia: {
        type: DataTypes.STRING(70),
        allowNull: true
    },
    consultoriocol: {
        type: DataTypes.STRING(45),
        allowNull: true
    }
}, {
    tableName: 'consultorios',
    timestamps: false
});

//module.exports = Consultorio;
