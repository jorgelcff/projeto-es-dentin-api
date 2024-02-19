import { DataTypes } from 'sequelize';
import {sequelize} from '../config/database.js';

import {Dentista} from './Dentista.js';
import {Consulta} from './Consulta.js';

export const Receita = sequelize.define('Receita', {
    pkReceita: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    orientacoes: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    medicamento: {
        type: DataTypes.STRING(15),
        allowNull: true
    },
    uso: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    fkConsulta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: 'consultas',
            key: 'pkConsulta'
        }
    },
    fkCRO: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: 'dentistas',
            key: 'cro'
        }
    }
}, {
    tableName: 'receitas',
    timestamps: false
});


Receita.belongsTo(Consulta, { foreignKey: 'fkConsulta', targetKey: 'pkConsulta' });
Receita.belongsTo(Dentista, { foreignKey: 'fkCRO', targetKey: 'cro' });


//module.exports = Receita;
