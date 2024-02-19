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
        allowNull: false
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
        type: DataTypes.STRING(45),
        allowNull: false
    },
    processoDoenca: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    cuidadoAparelho: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    acidente: {
        type: DataTypes.STRING(45),
        allowNull: false
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
