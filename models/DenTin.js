import { DataTypes } from 'sequelize';
import {sequelize} from '../config/database.js';

import {Paciente} from './Paciente.js';

export const DenTin = sequelize.define('DenTin', {
    pkDenTin: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(15),
        allowNull: true
    },
    status: {
        type: DataTypes.STRING(15),
        allowNull: false,
        defaultValue: "Limpo"
    },
    fkPaciente: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'dentins',
    timestamps: false
});


DenTin.belongsTo(Paciente, { foreignKey: 'fkPaciente', targetKey: 'pkPaciente' });

//module.exports = DenTin;
