import { DataTypes } from 'sequelize';
import {sequelize} from '../config/database.js';

import {Convenio} from './Convenio.js';
import {Dentista} from './Dentista.js';

export const Aceita = sequelize.define('Aceita', {
    fkConvenio: {
        type: DataTypes.INTEGER,
        allowNull: false, 
    },
    fkDentista: {
        type: DataTypes.INTEGER,
        allowNull: false, 
    },
    admissao: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {
    tableName: 'aceita_conv',
    timestamps: false
});


Aceita.belongsTo(Convenio, { foreignKey: 'fkConvenio', targetKey: 'pkConvenio' });
Aceita.belongsTo(Dentista, { foreignKey: 'fkDentista', targetKey: 'pkDentista' });


//module.exports = Aceita;
