import { DataTypes } from 'sequelize';
import {sequelize} from '../config/database.js';

import {Convenio} from './Convenio.js';
import {Paciente} from './Paciente.js';

export const Atendido = sequelize.define('Atendido', {
    fkPaciente: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    fkConvenio: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    admissao: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {
    tableName: 'atendidos',
    timestamps: false
});

Atendido.belongsTo(Paciente, { foreignKey: 'fkPaciente', targetKey: 'pkPaciente' });
Atendido.belongsTo(Convenio, { foreignKey: 'fkConvenio', targetKey: 'pkConvenio' });


//module.exports = Atendido;

