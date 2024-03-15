import { DataTypes } from 'sequelize';
import {sequelize} from '../config/database.js';

import {DenTin} from './DenTin.js';

export const Relatorio = sequelize.define('Relatorio', {
    pkRelatorio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    fkDentin: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    historico: {
        type: DataTypes.STRING(45),
        allowNull: true
    },
    dores: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    alimentacao: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    higiene: {
        type: DataTypes.JSONB,
        allowNull: false
    },
    processoDoenca: {
        type: DataTypes.STRING(45),
        allowNull: true
    },
    cuidadoAparelho: {
        type: DataTypes.STRING(45),
        allowNull: true
    },
    acidente: {
        type: DataTypes.STRING(45),
        allowNull: true
    },
    dataEmissao: {
        type: DataTypes.DATE,
        allowNull: false
    },
    dataReferencia: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'relatorios',
    timestamps: false
});


Relatorio.belongsTo(DenTin, { foreignKey: 'fkDentin', targetKey: 'pkDenTin' });


//module.exports = Relatorio;
