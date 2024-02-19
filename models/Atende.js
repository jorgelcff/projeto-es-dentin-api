import { DataTypes } from 'sequelize';
import {sequelize} from '../config/database.js';

import {Consultorio} from './Consultorio.js';
import {Dentista} from './Dentista.js';

export const Atende = sequelize.define('Atende', {
    fkDentista: {
        type: DataTypes.INTEGER,
        allowNull: true, 
    },
    fkConsultorio: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    disponibilidade: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    tableName: 'atendes',
    timestamps: false
});


Atende.belongsTo(Dentista, { foreignKey: 'fkDentista', targetKey: 'pkDentista' });
Atende.belongsTo(Consultorio, { foreignKey: 'fkConsultorio', targetKey: 'pkConsultorio' });


//module.exports = Atende;
