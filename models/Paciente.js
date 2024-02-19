import { DataTypes } from 'sequelize';
import {sequelize} from '../config/database.js';

import {Convenio} from './Convenio.js';

export const Paciente = sequelize.define('Paciente', {
    pkPaciente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    user: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    telefone: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    dataNasc: {
        type: DataTypes.DATE,
        allowNull: true
    },
    sexo: {
        type: DataTypes.STRING(2),
        defaultValue: 'N',
        allowNull: true
    },
    cidade: {
        type: DataTypes.STRING(25),
        allowNull: true
    },
    uf: {
        type: DataTypes.STRING(25),
        allowNull: true
    },
    bairro: {
        type: DataTypes.STRING(25),
        allowNull: true
    },
    rua: {
        type: DataTypes.STRING(25),
        allowNull: true
    },
    endereco: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    fkConvenio: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'convenios',
            key: 'pkConvenio'
        }
    },
    cardiaco: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    diabetico: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    alergico: {
        type: DataTypes.STRING(45),
        allowNull: false
    }
}, {
    tableName: 'pacientes',
    timestamps: false
});


Paciente.belongsTo(Convenio, { foreignKey: 'fkConvenio', targetKey: 'pkConvenio' });