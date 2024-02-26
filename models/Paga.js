import { DataTypes } from 'sequelize';
import {sequelize} from '../config/database.js';

import {Convenio} from './Convenio.js';
import {Paciente} from './Paciente.js';

export const Paga = sequelize.define('Atendido', {
    fkPaciente: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fkConvenio: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    admissao: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {
    tableName: 'paga_conv',
    timestamps: false
});

Paga.belongsTo(Paciente, { foreignKey: 'fkPaciente', targetKey: 'pkPaciente' });
Paga.belongsTo(Convenio, { foreignKey: 'fkConvenio', targetKey: 'pkConvenio' });


//module.exports = Atendido;

