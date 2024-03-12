import { DataTypes } from 'sequelize';
import {sequelize} from '../config/database.js';

import {Convenio} from './Convenio.js';
import {Paciente} from './Paciente.js';

export const Paga = sequelize.define('Paga', {
    fkPaciente: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fkConvenio: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'paga_conv',
    timestamps: false
});

Paga.belongsTo(Paciente, { foreignKey: 'fkPaciente', targetKey: 'pkPaciente', as: 'pacientes'});
Paga.belongsTo(Convenio, { foreignKey: 'fkConvenio', targetKey: 'pkConvenio', as: 'convenios' });


//module.exports = Atendido;

