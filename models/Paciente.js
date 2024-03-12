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
    cpf: {
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: true
    },
    nome: {
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
        type: DataTypes.STRING(12),
        allowNull: false,
        unique: true
    },
    dataNasc: {
        type: DataTypes.DATE,
        allowNull: true
    },
    sexo: {
        type: DataTypes.STRING(1),
        defaultValue: 'N',
        allowNull: true
    },
    cidade: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    uf: {
        type: DataTypes.STRING(25),
        allowNull: false
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
        type: DataTypes.STRING(10),
        allowNull: true
    },
    fkConvenio: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    cardiaco: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    diabetico: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    alergico: {
        type: DataTypes.STRING(45),
        allowNull: true
    }
}, {
    tableName: 'pacientes',
    timestamps: false
});


Paciente.belongsTo(Convenio, { foreignKey: 'fkConvenio', targetKey: 'pkConvenio' });